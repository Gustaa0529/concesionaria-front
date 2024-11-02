import { Routes } from '@angular/router';
import { ListarComponent } from './components/autos/listar/listar.component';
import { AgregarComponent } from './components/autos/agregar/agregar.component';
import { LoginComponent } from './components/login/login.component'; 
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'listar', component: ListarComponent },
  { path: 'agregar', component: AgregarComponent },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent}
];
