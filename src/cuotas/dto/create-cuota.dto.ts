import { IsDate, IsDateString, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator"
import { Types } from "mongoose"

export class CreateCuotaDto {

   
    @IsOptional()
    producto:Types.ObjectId
    
    @IsOptional()
    usuario:Types.ObjectId

    @IsNotEmpty({ message: 'El monto total es obligatorio' })
    @IsNumber({}, { message: 'El monto total debe ser numérico' })
    montoTotal: number;

    @IsNotEmpty({ message: 'La cantidad de cuotas es obligatoria' })
    @IsInt({ message: 'Ingrese números enteros para la cantidad de cuotas' })
    @Min(1, { message: 'Ingrese una cantidad positiva mayor que cero para las cuotas' })
    cantidadCuotas: number;

    @IsNotEmpty({ message: 'La fecha de pago es obligatoria' })
    @IsDateString({},{ message: 'Ingrese una fecha válida para la fecha de pago' })
    fechaDePago:string

    @IsNotEmpty()
    @IsOptional()
    montoPagar:number
}
