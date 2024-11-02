import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../../model/Vehiculo'; 
import { ServiceService } from '../../../service/service.service'; 
import { PaginadoResponse } from '../../../model/PaginadoVehiculos'; 
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../header/header.component";

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent]
})
export class ListarComponent implements OnInit {
  vehiculos: Vehiculo[] = [];
  totalElements: number = 0;
  pageSize: number = 3;
  currentPage: number = 0;

  constructor(private service: ServiceService) {}

  ngOnInit() {
    this.loadVehicles();
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
}
