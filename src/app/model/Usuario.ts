import { Rol } from './Rol';

export class Usuario {
  idUsuario!: number;
  nombre!: string;
  correo!: string;
  contrasena!: string;
  idSucursal!: number;
  rol!: Rol;
}

  