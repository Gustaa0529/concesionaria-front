import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../service/usuario.service';
import { PaginadoResponse } from '../../model/PaginadoDto';
import { Usuario } from '../../model/Usuario';
import { Sucursal } from '../../model/Sucursal';
import { Rol } from '../../model/Rol';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-paginado',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
  ]
})
export class UsuarioPaginadoComponent implements OnInit {
  usuariosPaginados!: PaginadoResponse<Usuario>;
  sucursales!: Sucursal[];
  usuarioForm!: FormGroup;
  size: number = 10;
  sort: string = 'idUsuario';
  numPage: number = 0;
  roles = Object.values(Rol);

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {}

  ngOnInit() {
    this.obtenerUsuariosPaginados();
    this.obtenerSucursales();
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      idSucursal: ['', Validators.required],
      rol: ['', Validators.required]
    });
  }

  obtenerUsuariosPaginados() {
    this.usuarioService.listarUsuariosPaginados(this.size, this.sort, this.numPage).subscribe((data) => {
      this.usuariosPaginados = data;
    });
  }

  obtenerSucursales() {
    this.usuarioService.listarSucursales().subscribe((data) => {
      this.sucursales = data;
    });
  }

  cambiarPagina(pagina: number) {
    this.numPage = pagina;
    this.obtenerUsuariosPaginados();
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      this.usuarioService.guardarUsuario(this.usuarioForm.value).subscribe(() => {
        this.obtenerUsuariosPaginados();
        this.usuarioForm.reset();
      });
    }
  }
}
