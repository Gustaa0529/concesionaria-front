import { Component } from '@angular/core';
import { AuthService } from '../../service/service.autenticacion';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  usuario: any;
  isAuthenticated: boolean | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.usuario = this.authService.getUsuario();
    }
  }
  listar() {
    this.router.navigate(['/listar']);
  }
}
