import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Types } from "mongoose"

export class CreateCuotaDto {

    @IsNotEmpty({message:'Este campo es obligatorio'})
    @IsString()
    producto:Types.ObjectId
    
    @IsNotEmpty({message:'Este campo es obligatorio'})
    usuario:Types.ObjectId

    @IsNotEmpty({message:'Este campo es obligatorio'})
    @IsNumber({},{message:'Este campo es numerico'})
    montoTotal:number

    @IsNotEmpty({message:'Este campo es obligatorio'})
    @IsNumber({},{message:'Este campo es numerico'})
    cantidadCoutas:number

    @IsNotEmpty()
    montoPagar:number
}
