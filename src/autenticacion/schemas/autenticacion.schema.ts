import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Rol, Genero, IsActive, Flag } from '../enums/autenticacion.enum';

@Schema()
export class Usuario {
    @Prop({unique:true})
    cedulaIdentidad: string
    @Prop()
    nombres: string
    @Prop()
    apellidos: string
    @Prop({unique: true})
    username: string
    @Prop()
    password: string
    @Prop()
    email: string
    @Prop()
    telefono: string
    
    @Prop()
    direccion: string

    @Prop({enum:Genero})
    genero: string
    @Prop({enum:Rol, default: Rol.cliente})
    rol: string
    @Prop({enum:IsActive, default: IsActive.Activo})
    is_active:string
    @Prop({enum:Flag, default:Flag.Nuevo})
    flag:string
    @Prop({ default:Date.now})
    createdAt:Date
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario)