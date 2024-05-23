import {IsString, IsNotEmpty, IsOptional, IsEmail,IsEnum } from 'class-validator'
import { Genero, Rol } from '../enums/autenticacion.enum'
export class CreateAutenticacionDto {
  
    @IsString()
    @IsNotEmpty({message:'Este campo es obligatorio'})
    cedulaIdentidad: string


    @IsString()
    @IsNotEmpty({message:'Este campo es obligatorio'})
    nombres: string

    
    @IsString()
    @IsNotEmpty({message:'Este campo es obligatorio'})
    apellidos: string


    @IsString()
    @IsNotEmpty({message:'Este campo es obligatorio'})
    username: string


    @IsString()
    @IsNotEmpty({message:'Este campo es obligatorio'})
    password: string

 
    @IsOptional()
    @IsEmail()
    email: string

    @IsString()
    @IsOptional()
    telefono: string



    @IsString()
    @IsOptional()
    direccion: string


    @IsEnum(Genero)
    @IsString()
    @IsNotEmpty({message:'Este campo es obligatorio'})
    genero: string

   
    @IsString()
    @IsEnum(Rol)
    @IsOptional()
    rol: string
}
