import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private router: Router) {}
  listar() {
    this.router.navigate(['/listar']);
  }
}
