import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { Types } from 'mongoose';

@Controller('gastos')
export class GastosController {
  constructor(private readonly gastosService: GastosService) {}

  @Post('create/:idUsuario')
  create(@Body() createGastoDto: CreateGastoDto , @Param('idUsuario') usuario:Types.ObjectId) {
    createGastoDto.usuario= new Types.ObjectId(usuario)
    return this.gastosService.create(createGastoDto);
  }

  @Get()
  findAll() {
    return this.gastosService.findAll();
  }

  @Get('listar/:idUsuario')
  findOneAll(@Param('idUsuario') id: Types.ObjectId) {
    return this.gastosService.findOneAll(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGastoDto: UpdateGastoDto) {
    return this.gastosService.update(+id, updateGastoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gastosService.remove(+id);
  }
}
