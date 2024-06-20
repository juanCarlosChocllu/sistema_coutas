import { IsString, IsNotEmpty, IsPositive, IsNumber } from "class-validator";

export class CreateProductoDto {
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
    @IsString({ message: 'El nombre del producto debe ser un texto' })
    nombreProducto: string;

    @IsNotEmpty({ message: 'El precio es obligatorio' })
    @IsNumber({}, { message: 'El precio debe ser numérico' })
    @IsPositive({ message: 'Ingrese un valor positivo para el precio' })
    precio: number;

    @IsNotEmpty({ message: 'La descripción es obligatoria' })
    @IsString({ message: 'La descripción debe ser un texto' })
    descripcion: string;
}

