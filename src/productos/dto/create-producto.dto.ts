
import {IsString, IsNotEmpty, IsNumber} from "class-validator"

export class CreateProductoDto {

    @IsNotEmpty({message:'Este campo es obligatorio'})
    @IsString({message:'Este campo deve ser de tipo texto'})
    nombreProducto:String

    @IsNumber({},{message:'Este campo es numerico'})
    @IsNotEmpty({message:'Este campo es obligatorio'})
    precio:Number
    
    @IsNotEmpty({message:'Este campo es obligatorio'})
    @IsString({message:'Este campo deve ser de tipo texto'})
    descripcion:String
    
}
