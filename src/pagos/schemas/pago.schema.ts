import { Prop, Schema, SchemaFactory , } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { EstadoPago } from '../enums/pago.enum';

@Schema()
export class Pago {

    @Prop({type: Types.ObjectId, ref:'Cuotas'})
    cuotas:Types.ObjectId
    
    @Prop({ ref:'Usuario'})
    usuarioResponsablePago:string

    @Prop()
    montoPagado:number

    @Prop({default:0})
    numeroDeCuota:number

    @Prop({default:0})
    totalPagado:number


    @Prop({enum:EstadoPago, default:EstadoPago.Pendiente})
    estadoPago:string
    
    @Prop({ default:Date.now})
    fechaPago:Date



    @Prop({ default:Date.now})
    createdAt:Date



}

export const PagosSchema= SchemaFactory.createForClass(Pago)