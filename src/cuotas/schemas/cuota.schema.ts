import { Prop, Schema, SchemaFactory , } from '@nestjs/mongoose';
import { EstadoCouta, Flag } from '../enums/enum.cuotas';
import { Types } from 'mongoose';

@Schema()
export class Cuota {
    @Prop({type:Types.ObjectId, ref:'Productos'})
    producto:string
    
    @Prop({type:Types.ObjectId, ref:'Usuario'})
    usuario:string

    @Prop()
    montoTotal:number

    @Prop()
    cantidadCoutas:number

    @Prop()
    montoPagar:number
    
    @Prop()
    TotalPagado:number

    @Prop({default:Date.now})
    fechaDePago:Date

    @Prop({enum:EstadoCouta, default:EstadoCouta.Pendiente})
    estadoCouta:string

    @Prop({enum:Flag, default:Flag.Nuevo})
    flag:string

    @Prop({ default:Date.now})
    createdAt:Date

}

export const CuotaSchema= SchemaFactory.createForClass(Cuota)
