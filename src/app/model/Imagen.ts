export class Imagen {
    nombre: string;
    contenido: string; // Base64 string or URL
    idVehiculo: number;
  
    constructor(nombre: string, contenido: string, idVehiculo: number) {
      this.nombre = nombre;
      this.contenido = contenido;
      this.idVehiculo = idVehiculo;
    }
  }
  