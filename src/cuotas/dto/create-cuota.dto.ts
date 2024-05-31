import { IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { Types } from "mongoose"

export class CreateCuotaDto {

   
    @IsOptional()
    producto:Types.ObjectId
    
    @IsOptional()
    usuario:Types.ObjectId

    @IsNotEmpty({message:'Este campo es obligatorio'})
    @IsNumber({},{message:'Este campo es numerico'})
    montoTotal:number

    @IsNotEmpty({message:'Este campo es obligatorio'})
    @IsInt({message:'Ingrese numeros enteros'})
    cantidadCuotas:number
    
    @IsNotEmpty({message:'Este campo es obligatorio'})
    @IsDateString({},{ message: 'La fecha de pago es requerida' })
    fechaDePago:string

    @IsNotEmpty()
    @IsOptional()
    montoPagar:number
}
