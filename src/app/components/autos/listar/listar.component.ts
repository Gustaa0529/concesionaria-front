import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../../model/Vehiculo'; 
import { ServiceService } from '../../../service/service.service'; 
import { PaginadoResponse } from '../../../model/PaginadoDto'; 
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { UpdatePriceComponent } from '../../../modal/update-price/update-price.component';
import { AddVehiculoComponent } from '../../../modal/add-vehiculo/add-vehiculo.component';
import { OrderModalComponentComponent } from '../../../modal/order-modal-component/order-modal-component.component';
import { FacturaService } from '../../../service/factura.service';
import { UsuarioService } from '../../../service/usuario.service';
import { Sucursal } from '../../../model/Sucursal';
import { AuthService } from '../../../service/service.autenticacion';
import { SolicitudVehiculoDto } from '../../../model/SolicitudVehiculo';
import { EstadoEnum } from '../../../model/EstadoEnum';
import { SolicitudesDialogComponent } from '../../../modal/solicitudes-dialog/solicitudes-dialog.component';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class ListarComponent implements OnInit {
  
  vehiculos: Vehiculo[] = [];
  totalElements: number = 0;
  pageSize: number = 6;
  currentPage: number = 0;
  sucursales: Sucursal[] = [];
  selectedSucursal!: number ;

  constructor(private service: ServiceService, public dialog: MatDialog, private facturaService: FacturaService, private usuarioService: UsuarioService
    ,private authService : AuthService
  ) {}

  ngOnInit() {
    this.loadVehicles();
    this.obtenerSucursales();
  }

  obtenerSucursales() {
    this.usuarioService.listarSucursales().subscribe((data) => {
      this.sucursales = data ?? []; // Usar operador de coalescencia nula para manejar valores null o undefined
    });
  }

  toggleGrid(event: Event): void { 
    const target = event.target as HTMLElement;
    const gridContainer = target.closest('.image-container')?.nextElementSibling as HTMLElement; 
    if (gridContainer) { 
      gridContainer.classList.toggle('show'); 
    }
  }

  loadVehicles() {
    this.service.getAutos(this.pageSize, 'idVehiculo', this.currentPage, this.selectedSucursal).subscribe(
      (data: PaginadoResponse<Vehiculo>) => {
        this.vehiculos = data.content ?? []; // Usar operador de coalescencia nula para manejar valores null o undefined
        this.totalElements = data.totalElements ?? 0; // Usar operador de coalescencia nula para manejar valores null o undefined
      },
      (error) => {
        console.error('Error al obtener vehículos:', error);
      }
    );
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.totalElements) {
      this.currentPage++;
      this.loadVehicles();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadVehicles();
    }
  }

  changePageSize(event: Event) {
    const target = event.target as HTMLSelectElement; 
    this.pageSize = Number(target.value); 
    this.currentPage = 0; 
    this.loadVehicles();
  }

  changeSucursal(event: Event) {
    const target = event.target as HTMLSelectElement; 
    this.selectedSucursal = Number(target.value); 
    this.loadVehicles();
  }

  openPriceDialog(vehiculo: Vehiculo): void {
    const dialogRef = this.dialog.open(UpdatePriceComponent, {
      width: '300px',
      data: { idVehiculo: vehiculo.idVehiculo, price: vehiculo.precio }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        vehiculo.precio = result.price;
      }
    });
  }

  openAddVehiculoDialog(): void {
    const dialogRef = this.dialog.open(AddVehiculoComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadVehicles(); 
      }
    });
  }

  openOrderModal(vehiculo: Vehiculo): void {
    const dialogRef = this.dialog.open(OrderModalComponentComponent, {
      width: '500px',
      data: { vehiculo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.facturaService.crearFactura(result).subscribe((factura) => {
          console.log('Factura creada:', factura);
          this.loadVehicles(); // Refrescar datos
        });
      }
    });
  }

  getIdSucursalint(): number {
    return parseInt(this.authService.getIdSucursal() || '0', 10);
  }

  getIdSucursal(): string | null {
    return this.authService.getIdSucursal();
  }

  solicitarVehiculo(vehiculo: Vehiculo) {
    const idSucursal = this.getIdSucursalint();
    if (!vehiculo.sucursal || !idSucursal) {
      console.error('Sucursal no seleccionada o vehiculo sin sucursal');
      return;
    }

    const solicitud: SolicitudVehiculoDto = {
      idSolicitud: 0, 
      vehiculoDto: vehiculo, 
      sucursal: {
        idSucursal: idSucursal, 
        direccion: '' 
      },
      estado: EstadoEnum.VEHICULOSOLICITADO 
    };

    this.service.guardarSolicitud(solicitud).subscribe(response => {
      console.log('Solicitud guardada:', response);
      // Lógica adicional después de guardar la solicitud
    }, error => {
      console.error('Error al guardar la solicitud:', error);
    });
  }

  openSolicitudesDialog(): void { 
    const dialogRef = this.dialog.open(SolicitudesDialogComponent, 
      { width: '80%', data: 
        { idSucursal: this.getIdSucursal(),
          pageSize: this.pageSize, currentPage: 
          this.currentPage 
        } 
      }); dialogRef.afterClosed().subscribe(result => { console.log('El diálogo se cerró');
         
          }); }
}