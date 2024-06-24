import { IsString, IsNotEmpty, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { Genero, Rol } from '../enums/autenticacion.enum';

export class CreateAutenticacionDto {
  
  @IsString()
  @IsNotEmpty({ message: 'La cédula de identidad es obligatoria' })
  cedulaIdentidad: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  nombres: string;

  @IsString()
  @IsNotEmpty({ message: 'Los apellidos son obligatorios' })
  apellidos: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'El correo electrónico es obligatorio' })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
  telefono: string;

  @IsString()
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  direccion: string;

  @IsEnum(Genero)
  @IsNotEmpty({ message: 'El género es obligatorio' })
  genero: Genero;

  @IsEnum(Rol)
  @IsOptional()
  rol: Rol;
}
