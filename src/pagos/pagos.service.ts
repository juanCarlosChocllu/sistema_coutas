import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pago } from './schemas/pago.schema';
import { Model, Types } from 'mongoose';
import { EstadoPago } from './enums/pago.enum';

import {CuotasService } from '../cuotas/cuotas.service'
import { AutenticacionService } from 'src/autenticacion/autenticacion.service';

@Injectable()
export class PagosService {

  constructor(
    @InjectModel(Pago.name) private PagosModel:Model<Pago>,
    private  cuotasService:CuotasService,
    private readonly autenticacionSerice:AutenticacionService
    
){}

  
  async createPago(createPagoDto: CreatePagoDto) {
    let cuotasPagadas=[]
   const pagosPendientes=  await this.buscarPagosNoPendientes(createPagoDto.idPago, createPagoDto.usuario)
    const {nombres, apellidos}= await this.autenticacionSerice.buscarUsuarioResposablePago(createPagoDto.usuarioResponsablePago)
    const usuario:string = nombres + ' '+apellidos 
   for(const cuota of pagosPendientes){
         const cuotaApagar= await this.PagosModel.findByIdAndUpdate({
            _id:cuota._id
          }, {estadoPago:EstadoPago.Pagado, usuarioResponsablePago:usuario}, {new:true}).exec()     
         cuotasPagadas = cuotasPagadas.concat(cuotaApagar)
      }    
      this.cuotasService.vericarCuotaCompletada(createPagoDto.usuario)
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
  

  async findAllPagadosCliente(cuota:string){
    try {
      const pagos= await this.PagosModel.find(
        {cuotas:new Types.ObjectId(cuota)}
      ).sort({numeroDeCuota: -1} ).exec()       
      const Pendientes= pagos.filter(pagos => pagos.estadoPago == EstadoPago.Pendiente)
      const Pagados = pagos.filter(pagos => pagos.estadoPago == EstadoPago.Pagado)
      const totaPagados= Pagados.reduce((acc, pagos)=> {
        return acc + pagos.totalPagado
      },0)
      const totalPendientes= Pendientes.reduce((acc, pagos)=> {
        return acc + pagos.totalPagado
      },0)
           
      return {
        pagosInformacio:{totaPagados,
          totalPendientes},
        pagos
      }
    } catch (error) {
       throw new NotFoundException()
    }
  }
  

   
}
