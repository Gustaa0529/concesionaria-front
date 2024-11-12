import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../model/Factura';
import { PaginadoResponse } from '../model/PaginadoDto';
import { FacturaEstadoEnum } from '../model/FacturaEstado';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = 'http://localhost:8080/factura'; // URL del BFF

  constructor(private http: HttpClient) {}

  // Crear una nueva factura
  crearFactura(factura: Factura): Observable<Factura> {
    return this.http.post<Factura>(`${this.apiUrl}/crear`, factura, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    });
  }

  // Obtener facturas paginadas
  listarFacturasPaginadas(size: number, sort: string, numPage: number, idSucursal?: number): Observable<PaginadoResponse<Factura>> {
    let params = new HttpParams()
      .set('size', size.toString())
      .set('sort', sort)
      .set('numPage', numPage.toString());

    if (idSucursal !== undefined) {
      params = params.set('idSucursal', idSucursal.toString());
    }

    return this.http.get<PaginadoResponse<Factura>>(`${this.apiUrl}/paginado`, { params, withCredentials: true });
  }

  // Obtener una factura por su ID
  obtenerFacturaPorId(idFactura: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.apiUrl}/${idFactura}`, { withCredentials: true });
  }

  // Actualizar el estado de una factura
  actualizarEstadoFactura(idFactura: number, nuevoEstado: FacturaEstadoEnum): Observable<Factura> {
    return this.http.put<Factura>(`${this.apiUrl}/actualizarEstado/${idFactura}`, JSON.stringify(nuevoEstado), {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true
    });
  }

  // Eliminar una factura
  eliminarFactura(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/eliminar/${id}`, { withCredentials: true });
  }
}
