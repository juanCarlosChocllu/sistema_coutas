import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { EstadoGasto, Flag } from "../enums/enum-gastos";

@Schema()
export class Gasto {
    @Prop( {type:Types.ObjectId ,ref:'usuarios'})
    usuario:Types.ObjectId

    @Prop()
    descripcion:string

    @Prop({default:0})
    monto:number

    @Prop({enum:Flag  ,default:Flag.Nuevo})
    flag: Flag

    @Prop({enum:EstadoGasto , default: EstadoGasto.Pendiente})
    estadoPago:EstadoGasto

    @Prop({default:Date.now})
    createAt:Date

}
export const GastoSchema= SchemaFactory.createForClass(Gasto)
