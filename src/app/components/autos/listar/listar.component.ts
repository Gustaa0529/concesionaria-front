import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../../model/Vehiculo'; 
import { ServiceService } from '../../../service/service.service'; 
import { PaginadoResponse } from '../../../model/PaginadoVehiculos'; 
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdatePriceComponent } from '../../../update-price/update-price.component';
import { AddVehiculoComponent } from '../../../add-vehiculo/add-vehiculo.component';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
  ]
})
export class ListarComponent implements OnInit {
  
  vehiculos: Vehiculo[] = [];
  totalElements: number = 0;
  pageSize: number = 3;
  currentPage: number = 0;

  constructor(private service: ServiceService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadVehicles();
  }

  toggleGrid(event: Event): void { 
    const target = event.target as HTMLElement;
    const gridContainer = target.closest('.image-container')?.nextElementSibling as HTMLElement; 
    if (gridContainer) { 
      gridContainer.classList.toggle('show'); 
    }
  }

  loadVehicles() {
    this.service.getAutos(this.pageSize, 'idVehiculo', this.currentPage).subscribe(
      (data: PaginadoResponse<Vehiculo>) => {
        this.vehiculos = data.content;
        this.totalElements = data.totalElements; // Asegúrate de que este campo exista
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
        // Aquí puedes manejar la actualización de la lista de vehículos si es necesario
        this.loadVehicles(); // Recargar la lista de vehículos
      }
    });
  }
}
