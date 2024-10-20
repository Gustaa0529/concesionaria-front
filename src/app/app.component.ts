import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule]
})
export class AppComponent {

  title = 'Auto-Style';
  constructor(private router: Router) {}

  listar() {
    this.router.navigate(['/listar']);
  }

  agregar() {
    this.router.navigate(['/agregar']);
  }
}
