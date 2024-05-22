import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post('create')
  async create(@Body() createProductoDto: CreateProductoDto) {
    return await this.productosService.create(createProductoDto);
  }

  @Get('listar')
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.productosService.softDelete(id);
  }
}
