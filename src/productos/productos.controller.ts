import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginacionDto } from './dto/paginacion-producto.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('productos')
@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Post('create')
  async create(@Body() createProductoDto: CreateProductoDto) {
        const producto= await this.productosService.create(createProductoDto)
        producto.save()
        const resultado={
          data:true,
          producto: producto
          
        }
    return resultado ;
  }

  @Get('listar')
  findAll(@Query() paginacionDto:PaginacionDto) {
    return this.productosService.findAll(paginacionDto);
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
