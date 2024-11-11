import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/usuario';
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    ) {
      this.isBrowser = isPlatformBrowser(this.platformId);
    }

  login(email: string, password: string): Observable<any> {
    const options = {
      withCredentials: true,  // Importante para enviar cookies de sesión
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(`${this.apiUrl}/login`, { correo: email, contrasena: password }, options).pipe(
      tap(response => {
        if (response.token && this.isBrowser) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('usuario', JSON.stringify(response.usuario));
        }
      })
    );
  }

  logout(): Observable<void> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const options = {
      withCredentials: true,  // Importante para enviar cookies de sesión
      headers
    };
    return this.http.post<void>(`${this.apiUrl}/logout`, {}, options).pipe(
      tap(() => {
        if (this.isBrowser) {
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
          localStorage.removeItem('idSucursal');
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return this.isBrowser && !!this.getToken();
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }

  getUsuario(): any {
    return this.isBrowser ? JSON.parse(localStorage.getItem('usuario')!) : null;
  }

  getIdSucursal(): string | null {
    return this.isBrowser ? localStorage.getItem('idSucursal') : null;
  }
}
