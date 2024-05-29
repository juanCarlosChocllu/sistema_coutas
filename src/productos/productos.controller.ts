import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginacionDto } from './dto/paginacion-producto.dto';
import { ApiTags } from '@nestjs/swagger';
import { tokenAutenticacionGuard } from 'src/autenticacion/guards/token.autenticacion.guard';
import { RolAutenticacionGuard } from 'src/autenticacion/guards/rol.autenticacion.guard';
import { Roles } from 'src/autenticacion/decorators/roles.decorators';
import { Rol } from 'src/autenticacion/enums/autenticacion.enum';


@ApiTags('productos')
@UseGuards(tokenAutenticacionGuard, RolAutenticacionGuard)
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}
  @Roles([Rol.Admin])
  @Post('create')
  async create(@Body() createProductoDto: CreateProductoDto) {
    return await this.productosService.create(createProductoDto);
  }

  @Roles([Rol.Admin])
  @Get('listar')
  findAll(@Query() paginacionDto:PaginacionDto) {
    return this.productosService.findAll(paginacionDto);
  }
  @Roles([Rol.Admin])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(id);
  }
  @Roles([Rol.Admin])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(id, updateProductoDto);
  }
  @Roles([Rol.Admin])
  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.productosService.softDelete(id);
  }
}
