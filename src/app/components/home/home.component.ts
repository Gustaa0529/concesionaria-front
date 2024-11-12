import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/service.autenticacion';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ HttpClientModule, CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
 
  constructor( private router: Router, private authService : AuthService) {}

  ngOnInit(): void {
  }

  listar() {
    this.router.navigate(['/listar']);
  }

  facturas(){
    this.router.navigate(['/facturas']);
  }

  usuarios(){
    this.router.navigate(['/usuarios']);
  }
  getRol(): string | null { 
    return this.authService.getRol(); 
  }
 
}
