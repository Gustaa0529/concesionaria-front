import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Factura } from '../../model/Factura';
import { FacturaEstadoEnum } from '../../model/FacturaEstado';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-modal',
  templateUrl: './order-modal-component.component.html',
  styleUrls: ['./order-modal-component.component.css'],
  standalone: true, 
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
  ]
})
export class OrderModalComponentComponent {
  facturaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OrderModalComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.facturaForm = this.fb.group({
      nombre: ['', Validators.required], 
      correo: ['', [Validators.required, Validators.email]], 
      metodoPago: ['', Validators.required], 
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
      idVehiculo: [{ value: this.data.vehiculo.idVehiculo, disabled: true }], 
      vehiculo: [{ value: this.data.vehiculo.modelo, disabled: true }] 
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.facturaForm.valid) {
      const nuevaFactura: Factura = {
        ...this.facturaForm.value,
        estado: FacturaEstadoEnum.ORDENADO,
        vehiculoDto: this.data.vehiculo
      };
      this.dialogRef.close(nuevaFactura);
    }
  }
}
