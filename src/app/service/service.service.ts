import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehiculo } from '../model/Vehiculo';
import { PaginadoResponse } from '../model/PaginadoDto'; 
import { Observable } from 'rxjs';
import { SolicitudVehiculoDto } from '../model/SolicitudVehiculo';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl = 'http://localhost:8080/vehiculo'; 
  crearFactura: any;

  constructor(private http: HttpClient) {}

  getAutos(size: number, sort: string, page: number, idSucursal?: number): Observable<PaginadoResponse<Vehiculo>> {
    let params = new HttpParams()
      .set('size', size.toString())
      .set('sort', sort)
      .set('numPage', page.toString());

    if (idSucursal) { 
      params = params.set('idSucursal', idSucursal.toString()); 
    }

    const options = {
      withCredentials: true, 
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: params
    };

    return this.http.get<PaginadoResponse<Vehiculo>>(`${this.baseUrl}/paginado`, options);
  }

  updatePrecio(idVehiculo: number, nuevoPrecio: number): Observable<Vehiculo> { 
    const url = `${this.baseUrl}/actualizar-precio/${idVehiculo}`; 
    const params = new HttpParams().set('nuevoPrecio', nuevoPrecio.toString()); 
    return this.http.put<Vehiculo>(url, {}, { params: params });
  }

  agregarVehiculo(vehiculo: Vehiculo): Observable<Vehiculo> { 
    const url = `${this.baseUrl}/agregar`; 
    return this.http.post<Vehiculo>(url, vehiculo); 
  }

  guardarSolicitud(solicitud: SolicitudVehiculoDto): Observable<SolicitudVehiculoDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<SolicitudVehiculoDto>(`${this.baseUrl}/guardarSolicitud`, solicitud, { headers });
  }

  listarSolicitudesPaginado(size: number, sort: string, numPage: number, idSucursal : number): Observable<PaginadoResponse<SolicitudVehiculoDto>> {

      const params = new HttpParams()
      .set('size', size.toString())
      .set('sort', sort)
      .set('numPage', numPage.toString())
      .set('idSucursal', idSucursal);

    return this.http.get<PaginadoResponse<SolicitudVehiculoDto>>(`${this.baseUrl}/listarSolicitudes`, { params });
  }

  eliminarSolicitud(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eliminarSolicitud/${id}`);
  }

  actualizarEstadoSolicitud(id: number, nuevoEstado: string): Observable<SolicitudVehiculoDto> {
    return this.http.put<SolicitudVehiculoDto>(`${this.baseUrl}/actualizarEstadoSolicitud/${id}?nuevoEstado=${nuevoEstado}`, {});
  }
}
