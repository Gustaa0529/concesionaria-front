import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehiculo } from '../model/Vehiculo';
import { PaginadoResponse } from '../model/PaginadoVehiculos'; // Asegúrate de importar el modelo correcto
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl = 'http://localhost:8081/vehiculos'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) {}

  getAutos(size: number, sort: string, page: number): Observable<PaginadoResponse<Vehiculo>> {
    return this.http.get<PaginadoResponse<Vehiculo>>(`${this.baseUrl}/listar/paginado?size=${size}&sort=${sort}&numPage=${page}&idSucursal=1`);
  }
}


