import { Routes } from '@angular/router';
import { ListarComponent } from './autos/listar/listar.component';
import { AgregarComponent } from './autos/agregar/agregar.component';

export const routes: Routes = [
  { path: 'listar', component: ListarComponent },
  { path: 'agregar', component: AgregarComponent }
];
