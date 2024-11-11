import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../service/service.service'; // Importa tu servicio

@Component({
  standalone: true,
  selector: 'app-add-vehiculo',
  templateUrl: './add-vehiculo.component.html',
  styleUrls: ['./add-vehiculo.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class AddVehiculoComponent {
  vehiculoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddVehiculoComponent>,
    private fb: FormBuilder,
    private service: ServiceService // Inyecta el servicio
  ) {
    this.vehiculoForm = this.fb.group({
      modelo: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      sucursal: this.fb.group({
        idSucursal: [null, Validators.required],
        direccion: ['', Validators.required] // Asegúrate de incluir dirección
      }),
      imagenes: this.fb.array([]) // Agrega un array para las imágenes
    });
  }

  get imagenes() {
    return this.vehiculoForm.get('imagenes') as FormArray;
  }

  addImagen(): void {
    this.imagenes.push(this.fb.group({
      ruta: ['', Validators.required],
      nombre: ['', Validators.required] // Agrega el campo nombre
    }));
  }

  removeImagen(index: number): void {
    this.imagenes.removeAt(index);
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.vehiculoForm.valid) {
      // Realiza la llamada al servicio para agregar el vehículo
      this.service.agregarVehiculo(this.vehiculoForm.value).subscribe(
        response => {
          // Aquí puedes manejar la respuesta si es necesario
          this.dialogRef.close(this.vehiculoForm.value);
        },
        error => {
          // Aquí puedes manejar el error si es necesario
          console.error('Error al agregar el vehículo:', error);
        }
      );
    }
  }
}
