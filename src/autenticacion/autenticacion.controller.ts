import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards ,Req} from '@nestjs/common';
import { Request } from 'express';
import { AutenticacionService } from './autenticacion.service';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto';
import { UpdateAutenticacionDto } from './dto/update-autenticacion.dto';
import { loginAutenticacionDto } from './dto/login-autenticacion.dto';
import { PaginacionDto } from './dto/paginacion.usuarios.dto';
import { tokenAutenticacionGuard } from './guards/token.autenticacion.guard';
import { RolAutenticacionGuard } from './guards/rol.autenticacion.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from './decorators/roles.decorators';
import { Rol } from './enums/autenticacion.enum';

@ApiTags('autenticacion')
@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}
  @UseGuards(tokenAutenticacionGuard, RolAutenticacionGuard)
  @Roles([Rol.Admin])
  @Post('create')
  create(@Body() createAutenticacionDto: CreateAutenticacionDto) {
    return this.autenticacionService.create(createAutenticacionDto);
  }

  @Post('login')
  login(@Body() loginAutenticacionDto:loginAutenticacionDto){
    return this.autenticacionService.login(loginAutenticacionDto)
  }
  
  @UseGuards(tokenAutenticacionGuard, RolAutenticacionGuard)
  @Roles([Rol.Admin])
  @Get('listar/clientes')
  async findAllClientes(@Query() paginacionDto:PaginacionDto, @Req() request:Request<Express.Application>) { 
    return await this.autenticacionService.findAllClientes(paginacionDto);
  }

  @UseGuards(tokenAutenticacionGuard, RolAutenticacionGuard)
  @Roles([Rol.Admin])
  @Get('listar/administradores')
  async findAllAdministradores(@Query() paginacionDto:PaginacionDto, @Req() request:Request<Express.Application>) { 
    console.log(request['idUsuario']);
    return await this.autenticacionService.findAllAdministradores(paginacionDto);
  }
  @UseGuards(tokenAutenticacionGuard, RolAutenticacionGuard)
  @Roles([Rol.Admin])
  @Get('cliente/:id')
  async findOne(@Param('id') id: string) {
    return await this.autenticacionService.findOneCliente(id)
  }

  @UseGuards(tokenAutenticacionGuard, RolAutenticacionGuard)
  @Roles([Rol.Admin])
  @Patch('actualizar/:id')
  update(@Param('id') id: string, @Body() updateAutenticacionDto: UpdateAutenticacionDto) {
    return this.autenticacionService.update(id, updateAutenticacionDto);
  }

  @UseGuards(tokenAutenticacionGuard, RolAutenticacionGuard)
  @Roles([Rol.Admin])
  @Delete('eliminar/:id')
  softDelte(@Param('id') id: string) {
    return this.autenticacionService.softDelele(id);
  }

  @UseGuards(tokenAutenticacionGuard, RolAutenticacionGuard)
  @Roles([Rol.Admin])
  @Delete('desactivar/cuenta/:id')
  desactivarCuenta(@Param('id') id: string) {
    return this.autenticacionService.desactivarCuenta(id);
  }



}
