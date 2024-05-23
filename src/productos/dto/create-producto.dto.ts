import { ApiProperty } from "@nestjs/swagger"
import {IsString, IsNotEmpty, IsNumber} from "class-validator"

export class CreateProductoDto {
    @ApiProperty()
    @IsNotEmpty({message:'Este campo es obligatorio'})
    @IsString({message:'Este campo deve ser de tipo texto'})
    nombreProducto:String

    @ApiProperty()
    @IsNumber({},{message:'Este campo es numerico'})
    @IsNotEmpty({message:'Este campo es obligatorio'})
    precio:Number


    @ApiProperty()
    @IsNotEmpty({message:'Este campo es obligatorio'})
    @IsString()
    descripcion:String
    
}
