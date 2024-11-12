import { Routes } from '@angular/router';
import { ListarComponent } from './components/autos/listar/listar.component';
import { AgregarComponent } from './components/autos/agregar/agregar.component';
import { LoginComponent } from './components/login/login.component'; 
import { HomeComponent } from './components/home/home.component';
import { FacturaComponent } from './components/facturas/facturas.component';
import { UsuarioPaginadoComponent } from './components/usuarios/usuarios.component';
import { AuthGuard } from './service/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'listar', component: ListarComponent, canActivate: [AuthGuard] },
  { path: 'agregar', component: AgregarComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'facturas', component: FacturaComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component:  UsuarioPaginadoComponent, canActivate: [AuthGuard] }
];
