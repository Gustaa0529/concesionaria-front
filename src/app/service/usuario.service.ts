import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginadoResponse } from '../model/PaginadoDto';
import { Usuario} from '../model/Usuario';
import { Sucursal } from '../model/Sucursal';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/usuario';

  constructor(private http: HttpClient) {}

  listarUsuariosPaginados(size: number, sort: string, numPage: number): Observable<PaginadoResponse<Usuario>> {
    let params = new HttpParams()
      .set('size', size.toString())
      .set('sort', sort)
      .set('numPage', numPage.toString());

    return this.http.get<PaginadoResponse<Usuario>>(`${this.apiUrl}/listar/paginado`, { params });
  }

  listarSucursales(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(`${this.apiUrl}/sucursales`);
  }

  guardarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/registro`, usuario);
  }
}
