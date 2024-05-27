import { Controller, Get, Post, Body, Patch, Param, Delete, Query, NotFoundException } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { Type } from 'class-transformer';


@ApiTags('pagos')
@Controller('pagos')
export class PagosController {
  constructor(private readonly pagosService: PagosService) {}

  @Post('create/:idUsuario')
  async createPago(@Body() createPagoDto: CreatePagoDto,@Param('idUsuario') usuario:string) {
   try {    
    const idPrueba='664bad54b59b2a83065c7ac3'
     createPagoDto.usuario= new Types.ObjectId(usuario)
     createPagoDto.usuarioResponsablePago= new Types.ObjectId(idPrueba)
    return await this.pagosService.createPago(createPagoDto);
   } catch (error) {     
      throw new NotFoundException(error.message)    
   }
  }

  @Get('pagados/listar/:idCliente')
  findAllPagadosCliente(@Param('idCliente') idCliente:string) {    
    return this.pagosService.findAllPagadosCliente(idCliente);
  }

  @Get('pendientes/listar/:idCliente')
  findAllPendientesCliente(@Param('idCliente') idCliente:string) {  
    return this.pagosService.findAllPendientesCliente(idCliente);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePagoDto: UpdatePagoDto) {
    return this.pagosService.update(+id, updatePagoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagosService.remove(+id);
  }
}
