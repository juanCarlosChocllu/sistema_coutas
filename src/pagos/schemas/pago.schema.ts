import { Prop, Schema, SchemaFactory , } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { EstadoPago } from '../enums/pago.enum';

@Schema()
export class Pago {

    @Prop({type: Types.ObjectId, ref:'Cuotas'})
    cuotas:Types.ObjectId

    @Prop({type: Types.ObjectId, ref:'Usuario'})//para verificar con que admin se iso el pago
    usuario= Types.ObjectId

    @Prop({type: Types.ObjectId, ref:'Usuario'})
    usuarioResponsablePago:Types.ObjectId

    @Prop()
    montoPagado:number

    @Prop({default:0})
    cantidadCoutasPagadas:number

    @Prop({enum:EstadoPago, default:EstadoPago.Pendiendte})
    estadoPago:string
    
    @Prop({ default:Date.now})
    fechaPago:Date


    @Prop({ default:Date.now})
    createdAt:Date



}

export const PagosSchema= SchemaFactory.createForClass(Pago)