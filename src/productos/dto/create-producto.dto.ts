import { ApiProperty } from "@nestjs/swagger"

export class CreateProductoDto {
    @ApiProperty()
    nombreProducto:String
    @ApiProperty()
    precio:Number
    @ApiProperty()
    descripcion:String
    
}
