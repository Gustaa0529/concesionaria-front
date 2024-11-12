import{Vehiculo} from "./Vehiculo";
import{Sucursal} from "./Sucursal";
import { EstadoEnum } from './EstadoEnum';

export interface SolicitudVehiculoDto {
  idSolicitud: number;
  vehiculoDto: Vehiculo;
  sucursal: Sucursal;
  estado: EstadoEnum;
}
