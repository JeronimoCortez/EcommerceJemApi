export interface OrdenCompra {
  id: number;
  usuarioId: number;
  fecha: Date;
  precioTotal: number;
  metodoPago: string;
  estado: string;
}