import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ServiceService } from '../../service/service.service';
import { SolicitudVehiculoDto } from '../../model/SolicitudVehiculo';
import { PaginadoResponse } from '../../model/PaginadoDto';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-solicitudes-dialog',
  templateUrl: './solicitudes-dialog.component.html',
  styleUrls: ['./solicitudes-dialog.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule
  ]
})
export class SolicitudesDialogComponent implements OnInit {
  displayedColumns: string[] = ['idSolicitud', 'modelo', 'estado', 'acciones'];
  solicitudes: SolicitudVehiculoDto[] = [];
  paginadoResponse: PaginadoResponse<SolicitudVehiculoDto> | undefined;
  totalElements: number = 0;
  pageSize: number = 3;
  currentPage: number = 0;

  constructor(
    public dialogRef: MatDialogRef<SolicitudesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ServiceService
  ) {}

  ngOnInit(): void {
    this.listarSolicitudes(this.pageSize, 'idSolicitud', this.currentPage);
  }

  listarSolicitudes(size: number, sort: string, numPage: number) {
    const idSucursal = localStorage.getItem('idSucursal');
    if (!idSucursal) {
      console.error('No se encontró el idSucursal en el localStorage');
      return;
    }
    
    this.service.listarSolicitudesPaginado(size, sort, numPage, parseInt(idSucursal, 10)).subscribe(response => {
      this.paginadoResponse = response;
      this.solicitudes = response.content;
      this.totalElements = response.totalElements;
    }, error => {
      console.error('Error al listar las solicitudes:', error);
    });
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  rechazarSolicitud(solicitud: SolicitudVehiculoDto): void {
    this.service.eliminarSolicitud(solicitud.idSolicitud).subscribe(() => {
      this.solicitudes = this.solicitudes.filter(s => s.idSolicitud !== solicitud.idSolicitud);
      console.log('Solicitud rechazada:', solicitud);
    }, error => {
      console.error('Error al rechazar la solicitud:', error);
    });
  }

  enviarSolicitud(solicitud: SolicitudVehiculoDto): void {
    this.service.actualizarEstadoSolicitud(solicitud.idSolicitud, 'VEHICULOENVIADO').subscribe(actualizada => {
      solicitud.estado = actualizada.estado;
      console.log('Solicitud enviada:', solicitud);
    }, error => {
      console.error('Error al enviar la solicitud:', error);
    });
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.listarSolicitudes(this.pageSize, 'idSolicitud', this.currentPage);
    }
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.pageSize < this.totalElements) {
      this.currentPage++;
      this.listarSolicitudes(this.pageSize, 'idSolicitud', this.currentPage);
    }
  }
}
