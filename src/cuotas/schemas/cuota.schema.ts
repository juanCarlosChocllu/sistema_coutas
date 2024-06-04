import { Prop, Schema, SchemaFactory , } from '@nestjs/mongoose';
import { EstadoCuota, Flag } from '../enums/enum.cuotas';
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
    cantidadCuotas:number

    @Prop()
    montoPagar:number
    
    @Prop()
    TotalPagado:number

    @Prop({default:Date.now})
    fechaDePago:Date

    @Prop({enum:EstadoCuota, default:EstadoCuota.Pendiente})
    estadoCouta:string

    @Prop({enum:Flag, default:Flag.Nuevo})
    flag:string

    @Prop({ default:Date.now})
    createdAt:Date

}

export const CuotaSchema= SchemaFactory.createForClass(Cuota)
