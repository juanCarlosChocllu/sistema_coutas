import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CuotasService } from './cuotas.service';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';
import { Types } from 'mongoose';
import { PaginacionDto } from './dto/paginacion.cuotas';

@Controller('cuotas')
export class CuotasController {
  constructor(private readonly cuotasService: CuotasService) {}

  @Post('register')
  create(@Body() createCuotaDto: CreateCuotaDto) {
    createCuotaDto.usuario= new Types.ObjectId(createCuotaDto.usuario)
    createCuotaDto.producto =new Types.ObjectId(createCuotaDto.producto)
   return this.cuotasService.create(createCuotaDto);
  }

  @Get('listar')
  findAll(@Query() paginacionDto:PaginacionDto) {
    return this.cuotasService.findAll(paginacionDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuotasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuotaDto: UpdateCuotaDto) {
    return this.cuotasService.update(+id, updateCuotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuotasService.remove(+id);
  }
}
