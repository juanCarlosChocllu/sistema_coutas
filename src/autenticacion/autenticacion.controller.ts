import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards ,Req} from '@nestjs/common';
import { Request } from 'express';
import { AutenticacionService } from './autenticacion.service';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto';
import { UpdateAutenticacionDto } from './dto/update-autenticacion.dto';
import { loginAutenticacionDto } from './dto/login-autenticacion.dto';
import { PaginacionDto } from './dto/paginacion.usuarios.dto';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Post('create')
  create(@Body() createAutenticacionDto: CreateAutenticacionDto) {
    return this.autenticacionService.create(createAutenticacionDto);
  }

  @Post('login')
  login(@Body() loginAutenticacionDto:loginAutenticacionDto){
    return this.autenticacionService.login(loginAutenticacionDto)
  }

  @Get('listar/clientes')
  async findAllClientes(@Query() paginacionDto:PaginacionDto, @Req() request:Request<Express.Application>) { 
    console.log(request['idUsuario']);
    return await this.autenticacionService.findAllClientes(paginacionDto);
  }

  @Get('listar/administradores')
  async findAllAdministradores(@Query() paginacionDto:PaginacionDto, @Req() request:Request<Express.Application>) { 
    console.log(request['idUsuario']);
    return await this.autenticacionService.findAllAdministradores(paginacionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.autenticacionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAutenticacionDto: UpdateAutenticacionDto) {
    return this.autenticacionService.update(+id, updateAutenticacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autenticacionService.remove(+id);
  }
}
