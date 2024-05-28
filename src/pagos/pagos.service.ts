import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pago } from './schemas/pago.schema';
import { Model, Types } from 'mongoose';
import { EstadoPago } from './enums/pago.enum';

import {CuotasService } from '../cuotas/cuotas.service'

@Injectable()
export class PagosService {

  constructor(
    @InjectModel(Pago.name) private PagosModel:Model<Pago>,
    private  cuotasService:CuotasService
    
){}

  
  async createPago(createPagoDto: CreatePagoDto) {
    
    let cuotasPagadas=[]
 
   const pagosPendientes=  await this.buscarPagosNoPendientes(createPagoDto.idPago, createPagoDto.usuario)
   for(const cuota of pagosPendientes){
    console.log(cuota);
    
         const cuotaApagar= await this.PagosModel.findByIdAndUpdate({
            _id:cuota._id
          }, {estadoPago:EstadoPago.Pagado}, {new:true}).exec()     
         cuotasPagadas = cuotasPagadas.concat(cuotaApagar)
      }    
      
      this.cuotasService.vericarCuotaCompletada(cuotasPagadas, createPagoDto.usuario)
      return cuotasPagadas
  }

 async  buscarPagosNoPendientes(idPagos:Types.ObjectId[], usuario:Types.ObjectId){
  
  let pagosPendientes =[]
     for(const id of idPagos){            
      const pagosPendientesModel= await this.PagosModel.find({
        _id: new Types.ObjectId(id),
        usuario:usuario,
        estadoPago:EstadoPago.Pendiente
      }).exec()
  
    pagosPendientes = pagosPendientes.concat(pagosPendientesModel)
     }     
     
     
    return pagosPendientes
  }
  
  findAll() {
    return this.PagosModel.find();
  }

  async findAllPagadosCliente(id:string){
    try {
      const pagadosPorCliente = await this.PagosModel.find(
        {usuario:new Types.ObjectId(id)}
      ).sort({numeroDeCuota: -1} ).exec()
      return pagadosPorCliente
    } catch (error) {
       throw new NotFoundException()
    }
  }


 
  async findAllPendientesCliente(id:string){   
    try {
      const pendientePorCliente = await this.PagosModel.find(
        {usuario:new Types.ObjectId(id),
    estadoPago:EstadoPago.Pendiente}).exec()
      return pendientePorCliente
    } catch (error) {
       throw new NotFoundException()
      
    }
  }



  findOne(id: number) {
    return `This action returns a #${id} pago`;
  }

  update(id: number, updatePagoDto: UpdatePagoDto) {
    return `This action updates a #${id} pago`;
  }

  remove(id: number) {
    return `This action removes a #${id} pago`;
  }
}
