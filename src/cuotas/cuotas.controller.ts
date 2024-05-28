import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, UseGuards } from '@nestjs/common';
import { CuotasService } from './cuotas.service';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';
import { Types } from 'mongoose';
import { PaginacionDto } from './dto/paginacion.cuotas';
import { ApiTags } from '@nestjs/swagger';
import { tokenAutenticacionGuard } from 'src/autenticacion/guards/token.autenticacion.guard';
import { RolAutenticacionGuard } from 'src/autenticacion/guards/rol.autenticacion.guard';
import { rootCertificates } from 'tls';

@ApiTags('cuotas')
@UseGuards(tokenAutenticacionGuard)
@Controller('cuotas')
export class CuotasController {
  constructor(private readonly cuotasService: CuotasService) {}

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

  @Get('listar')
  findAll(@Query() paginacionDto:PaginacionDto) {
    console.log('hola')
    return this.cuotasService.findAll(paginacionDto);
  }
  @Get('usuario/:id')
  findCuotasPorUsuario(@Param('id') id: string){
    return this.cuotasService.findCuotasPorUsuario(id)

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuotasService.findOne(id);
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
