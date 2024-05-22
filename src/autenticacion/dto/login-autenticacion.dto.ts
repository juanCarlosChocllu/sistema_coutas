import {IsString, IsNotEmpty} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class loginAutenticacionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:'Este campo es obligatorio'})
    username: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:'Este campo es obligatorio'})
    password: string
}