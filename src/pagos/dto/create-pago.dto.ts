import { Types } from "mongoose"
import {IsNotEmpty, IsOptional, ArrayMinSize, IsMongoId, IsDefined} from 'class-validator'

export class CreatePagoDto {
    @IsOptional()
    usuario:Types.ObjectId

    @IsMongoId({each:true, message:'Pago invalido'})
    @IsNotEmpty({ message:'Este campo es obligatorio'})
    idPago:Types.ObjectId[]

    @IsOptional()
    numeroDeCuota:number

    @IsOptional()
    usuarioResponsablePago:Types.ObjectId
   
}
