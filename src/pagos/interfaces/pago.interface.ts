import { Document, Types } from 'mongoose';

export interface PagoInterface extends Document {
    _id: Types.ObjectId;
    cuotas: Types.ObjectId;
    usuarioResponsablePago: string;
    montoPagado: number;
    numeroDeCuota: number;
    totalPagado: number;
    fechaCancelacionPago: Date;
    pagoAdelantado: boolean;
    estadoPago: string;
    fechaPago: Date;
    createdAt: Date;
}