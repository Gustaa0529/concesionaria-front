import { Vehiculo } from './Vehiculo';
import { FacturaEstadoEnum } from './FacturaEstado'; 

export class Factura {
  idFactura!: number;
  nombre!: string;
  correo!: string;
  metodoPago!: string;
  telefono!: number;
  estado!: FacturaEstadoEnum; 
  vehiculoDto!: Vehiculo; 
}
