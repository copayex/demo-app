export type View = 'tickets' | 'pagos-recibidos' | 'configuracion' | 'static-qrs' | 'ticket-detalle' | 'pago-pantalla';

export interface Ticket {
  id: number;
  titulo: string;
  descripcion: string;
  pagado: number;
  total: number;
  fecha: string;
  status: 'activo' | 'finalizado' | 'anulado';
  metodosPagoHabilitados: string[];
}

export interface PagoRecibido {
  id: number;
  ticketId: number;
  ticket: string;
  descripcion: string;
  metodoPago: string;
  formaPago: string;
  monto: number;
  fecha: string;
  status?: 'aprobado' | 'reembolsado';
}

export interface QRCode {
  id: number;
  numero: string;
  estado: 'disponible' | 'en uso';
  vinculo?: string;
}

export interface MetodoPago {
  id: string;
  nombre: string;
  descripcion: string;
  conectado: boolean;
  cuenta?: string;
  titular?: string;
  email?: string;
  logo?: string;
}
