import { Types } from "mongoose"
import {IsDateString, IsNotEmpty, IsOptional, ArrayMinSize, IsMongoId, IsString} from 'class-validator'

export class CreatePagoDto {
    
    @IsNotEmpty()
    cuotas:Types.ObjectId[]=[]

    @IsOptional()
    usuario:Types.ObjectId

   
    @IsNotEmpty()
    @IsMongoId({each:true, message:'Pago invalido'})
    idPago:Types.ObjectId[]=[]

    @IsOptional()
    usuarioResponsablePago:Types.ObjectId
   
}
