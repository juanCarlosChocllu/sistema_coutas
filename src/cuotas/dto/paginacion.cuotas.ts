
import {IsString, IsOptional, IsDateString} from 'class-validator'

export class PaginacionDto{
    @IsOptional()
    @IsString()
    pagina:String

    @IsOptional()
    @IsString()
    limite:String

    @IsOptional()
    @IsString()
    buscar:string


    @IsOptional()
    @IsDateString()
    fechaBusqueda:string



}