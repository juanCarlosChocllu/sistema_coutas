import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose"
import { Flag } from "../enums/productos.enum"


@Schema()
export class Producto {
    @Prop()
    nombreProducto:String
    
    @Prop()
    precio:Number

    @Prop()
    descripcion:String

    @Prop({default:Flag.Nuevo})
    flag:String

    @Prop({ default:Date.now})
    createdAt:Date


}

export const ProductoSchema = SchemaFactory.createForClass(Producto)

