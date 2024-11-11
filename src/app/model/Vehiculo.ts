import { Imagen } from "./Imagen";
import { Sucursal } from "./Sucursal";

export class Vehiculo {
  idVehiculo: number;
  modelo: string;
  stock: number;
  precio: number;
  sucursal: Sucursal;
  imagenes: Imagen[];  

  constructor(
    idVehiculo: number,
    modelo: string,
    stock: number,
    precio: number,
    sucursal: Sucursal,
    imagenes: Imagen[]
  ) {
    this.idVehiculo = idVehiculo;
    this.modelo = modelo;
    this.stock = stock;
    this.precio = precio;
    this.sucursal = sucursal;
    this.imagenes = imagenes;
  }
}