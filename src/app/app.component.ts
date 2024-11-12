import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent]
})
export class AppComponent {

  title = 'Concesionaria';
  constructor(private router: Router) {}

  listar() {
    this.router.navigate(['/listar']);
  }

  agregar() {
    this.router.navigate(['/agregar']);
  }

  login(){
    this.router.navigate(['/login']);
  }

}
