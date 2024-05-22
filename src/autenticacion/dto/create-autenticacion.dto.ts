import {IsString, IsNotEmpty, IsOptional, IsEmail,IsEnum } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Genero, Rol } from '../enums/autenticacion.enum'
export class CreateAutenticacionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:'Este campo es obligatorio'})
    cedulaIdentidad: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:'Este campo es obligatorio'})
    nombres: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:'Este campo es obligatorio'})
    apellidos: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:'Este campo es obligatorio'})
    username: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:'Este campo es obligatorio'})
    password: string

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    telefono: string


    @ApiProperty()
    @IsString()
    @IsOptional()
    direccion: string

    @ApiProperty()
    @IsEnum(Genero)
    @IsString()
    @IsNotEmpty({message:'Este campo es obligatorio'})
    genero: string

    @ApiProperty()
    @IsString()
    @IsEnum(Rol)
    @IsOptional()
    rol: string
}
