import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehiculo } from '../model/Vehiculo';
import { PaginadoResponse } from '../model/PaginadoVehiculos'; // Asegúrate de importar el modelo correcto
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl = 'http://localhost:8080/vehiculo'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) {}

  getAutos(size: number, sort: string, page: number): Observable<PaginadoResponse<Vehiculo>> {
    const options = {
      withCredentials: true, // Importante para enviar cookies de sesión
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<PaginadoResponse<Vehiculo>>(`${this.baseUrl}/paginado?size=${size}&sort=${sort}&numPage=${page}`, options);
  }
  // Método para actualizar el precio del vehículo 
  updatePrecio(idVehiculo: number, nuevoPrecio: number): Observable<Vehiculo> { 
    const url = `${this.baseUrl}/actualizar-precio/${idVehiculo}`; 
    const params = new HttpParams().set('nuevoPrecio', nuevoPrecio.toString()); 
    return this.http.put<Vehiculo>(url, {}, { params: params });
  }

  agregarVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> { 
    const url = `${this.baseUrl}/agregar`; 
    return this.http.post<Vehiculo>(url, vehiculo); 
  }
  
}
