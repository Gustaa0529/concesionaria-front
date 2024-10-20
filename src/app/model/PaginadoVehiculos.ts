export interface PaginadoResponse<T> {
  content: T[];         // Contenido de la página (array de elementos)
  totalElements: number; // Total de elementos en la base de datos
  totalPages: number;    // Total de páginas
  size: number;          // Tamaño de la página
  number: number;        // Número de la página actual
}