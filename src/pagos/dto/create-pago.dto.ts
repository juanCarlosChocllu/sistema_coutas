import { Types } from "mongoose"
import {IsNotEmpty, IsNumber, isNotEmpty} from 'class-validator'

export class CreatePagoDto {
    @IsNotEmpty()
    cuotas:Types.ObjectId

    @IsNotEmpty()
    usuario= Types.ObjectId
    @IsNotEmpty()
    
    usuarioResponsablePago:Types.ObjectId

    @IsNotEmpty()
    @IsNumber({},{message:'Este campo es numerico'})
    montoPagado:number

   
}
