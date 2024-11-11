import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../service/service.service'; // Importa tu servicio

@Component({
  standalone: true,
  selector: 'app-update-price',
  templateUrl: './update-price.component.html',
  styleUrls: ['./update-price.component.css'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule
  ]
})
export class UpdatePriceComponent {
  priceForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UpdatePriceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private service: ServiceService // Inyecta el servicio
  ) {
    this.priceForm = this.fb.group({
      price: [data.price, [Validators.required, Validators.min(0)]]
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.priceForm.valid) {
      // Realiza la llamada al servicio para actualizar el precio
      this.service.updatePrecio(this.data.idVehiculo, this.priceForm.value.price).subscribe(
        response => {
          // Aquí puedes manejar la respuesta si es necesario
          this.dialogRef.close(this.priceForm.value);
        },
        error => {
          // Aquí puedes manejar el error si es necesario
          console.error('Error al actualizar el precio:', error);
        }
      );
    }
  }
}
