import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../service/factura.service';
import { Factura } from '../../model/Factura';
import { PaginadoResponse } from '../../model/PaginadoDto';
import { CommonModule } from '@angular/common';
import { FacturaEstadoEnum } from '../../model/FacturaEstado'; // Importa el enum
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-factura',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
  standalone: true,
  imports: [ CommonModule, 
    ReactiveFormsModule,
    HttpClientModule]
})
export class FacturaComponent implements OnInit {
  facturas: Factura[] = [];
  totalElements: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;
  facturaEstadoEnum = FacturaEstadoEnum; // Agrega esto para usar el enum en la plantilla

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.loadFacturas();
  }

  loadFacturas() {
    this.facturaService.listarFacturasPaginadas(this.pageSize, 'idFactura', this.currentPage).subscribe(
      (data: PaginadoResponse<Factura>) => {
        this.facturas = data.content ?? [];
        this.totalElements = data.totalElements;
      },
      (error) => {
        console.error('Error al obtener facturas:', error);
      }
    );
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.totalElements) {
      this.currentPage++;
      this.loadFacturas();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadFacturas();
    }
  }

  changePageSize(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.pageSize = Number(target.value);
    this.currentPage = 0;
    this.loadFacturas();
  }

  // Eliminar una factura con confirmación
  eliminarFactura(id: number): void {
    const confirmed = window.confirm("¿Estás seguro de que quieres eliminar esta factura?");
    if (confirmed) {
      this.facturaService.eliminarFactura(id).subscribe(response => {
        console.log(response);
        this.loadFacturas(); // Refrescar datos
      });
    }
  }

  // Actualizar el estado de una factura
  actualizarEstado(id: number, nuevoEstado: FacturaEstadoEnum): void {
    this.facturaService.actualizarEstadoFactura(id, nuevoEstado).subscribe(factura => {
      console.log('Estado actualizado:', factura);
      this.loadFacturas(); // Refrescar datos
    });
  }

  // Mostrar los botones de estado
  mostrarBotonVendido(estado: string): boolean {
    return estado === FacturaEstadoEnum.ORDENADO;
  }
}
