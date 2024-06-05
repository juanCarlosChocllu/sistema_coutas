import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, UseGuards } from '@nestjs/common';
import { CuotasService } from './cuotas.service';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';
import { Types } from 'mongoose';
import { PaginacionDto } from './dto/paginacion.cuotas';
import { ApiTags } from '@nestjs/swagger';
import { tokenAutenticacionGuard } from 'src/autenticacion/guards/token.autenticacion.guard';
import { RolAutenticacionGuard } from 'src/autenticacion/guards/rol.autenticacion.guard';
import { Roles } from 'src/autenticacion/decorators/roles.decorators';
import { Rol } from 'src/autenticacion/enums/autenticacion.enum';
import { Usuario } from 'src/autenticacion/schemas/autenticacion.schema';
import { Cuota } from './schemas/cuota.schema';
import { query } from 'express';

@ApiTags('cuotas')
@UseGuards(tokenAutenticacionGuard, RolAutenticacionGuard)
@Controller('cuotas')
export class CuotasController {
  constructor(private readonly cuotasService: CuotasService) {}

  @Roles([Rol.Admin])
  @Post('create/:idUsuario/:idProdcuto')
  create( @Param ('idUsuario') idUsuario:string , @Param('idProdcuto') idProdcuto:string , @Body()  createCuotaDto: CreateCuotaDto) {
    try {
    createCuotaDto.usuario= new Types.ObjectId(idUsuario)
    createCuotaDto.producto =new Types.ObjectId(idProdcuto)
    return this.cuotasService.create(createCuotaDto);
   } catch (error) {
      if(error){
        throw new BadRequestException()
      }
    
   }
  }


  @Roles([Rol.Admin, Rol.cliente])
  @Get('listar/cliente/:idUsuario')
  async listarCuotasCliente(@Param('idUsuario') usuario:Types.ObjectId, @Query() paginacionDto:PaginacionDto ){
    return await this.cuotasService.listarCuotasCliente(usuario, paginacionDto)

  }


}
