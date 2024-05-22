import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cuota } from './schemas/cuota.schema';
import { Model, Types } from 'mongoose';
import { PaginacionDto } from './dto/paginacion.cuotas';
import { Flag } from './enums/enum.cuotas';

@Injectable()
export class CuotasService {
  constructor(@InjectModel(Cuota.name) private CuotaModel:Model<Cuota>){}


  async create(createCuotaDto: CreateCuotaDto) {
    createCuotaDto.montoPagar= (createCuotaDto.montoTotal / createCuotaDto.cantidadCoutas)
    const cuota= await this.CuotaModel.create(createCuotaDto)    
    return  cuota.save() ;
  }

  async findAll(paginacionDto:PaginacionDto){
    const {pagina, limite, buscar}=paginacionDto
    const paginaNumero =Number(pagina) || 1
    const limiteNumero =Number(limite)|| 20
    const totalCuotas= await this.CuotaModel.countDocuments().exec()    
    const totalPaginas= Math.ceil(totalCuotas / limiteNumero)
    const cuotas = await this.CuotaModel.find({flag:Flag.Nuevo})
    .skip((paginaNumero -1 )* limiteNumero)
    .limit(limiteNumero)
    .exec()
    return {
      data:cuotas,
      totalPaginas:totalPaginas
    } ;
  }

  async findCuotasPorUsuario(id: string){
    try {
      const cuotasPorUsuario= await this.CuotaModel.find({usuario:new Types.ObjectId(id), flag:Flag.Nuevo}).exec()
      return cuotasPorUsuario
    } catch (error) {
        if(error){
          throw new BadRequestException('Usuario invalido')
        }  
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} cuota`;
  }

  update(id: number, updateCuotaDto: UpdateCuotaDto) {
    return `This action updates a #${id} cuota`;
  }

  remove(id: number) {
    return `This action removes a #${id} cuota`;
  }
}
