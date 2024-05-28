import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Types } from "mongoose"

export class CreateGastoDto {
    @IsMongoId({message:'Id incorrecto'})
    @IsOptional()
    usuario:Types.ObjectId

    @IsNotEmpty({message:'Este campo es requerido'})
    @IsString()
    descripcion:string

    @IsNotEmpty({message:'Este campo es requerido'})
    @IsNumber()
    monto:number
}

