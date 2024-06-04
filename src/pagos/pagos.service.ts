import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pago } from './schemas/pago.schema';
import { Model, Types } from 'mongoose';
import { EstadoPago } from './enums/pago.enum';

import {CuotasService } from '../cuotas/cuotas.service'
import { AutenticacionService } from 'src/autenticacion/autenticacion.service';
import { log } from 'console';
import { retry } from 'rxjs';

@Injectable()
export class PagosService {

  constructor(
    @InjectModel(Pago.name) private PagosModel:Model<Pago>,
    private  cuotasService:CuotasService,
    private readonly autenticacionSerice:AutenticacionService
    
){}

  
  async createPago(createPagoDto: CreatePagoDto) {    
    let cuotasPagadas=[]
   const pagosPendientes=  await this.buscarPagosNoPendientes(createPagoDto.idPago, createPagoDto.cuota)
    const {nombres, apellidos}= await this.autenticacionSerice.buscarUsuarioResposablePago(createPagoDto.usuarioResponsablePago)
    const usuario:string = nombres + ' '+apellidos 
   for(const cuota of pagosPendientes){
         const cuotaApagar= await this.PagosModel.findByIdAndUpdate({
            _id:cuota._id
          }, {estadoPago:EstadoPago.Pagado, usuarioResponsablePago:usuario}, {new:true}).exec()     
         cuotasPagadas = cuotasPagadas.concat(cuotaApagar)
      }    
      this.cuotasService.vericarCuotaCompletada(createPagoDto.cuota)
      return cuotasPagadas
  }

 async  buscarPagosNoPendientes(idPagos:Types.ObjectId[], cuota:Types.ObjectId){
;  
  let pagosPendientes =[]
     for(const id of idPagos){       
 
      const pagosPendientesModel= await this.PagosModel.find({
        _id: new Types.ObjectId(id),
        cuotas: new Types.ObjectId(cuota),
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
      ).exec()       
     const pagosPendientes= this.calcularPagosPendiente(pagos)
    const pagosPagados= this.calcularPagosPagados(pagos)
      return {
        pagosPendientes,
        pagosPagados,
        pagos
      }
    } catch (error) {
       throw new NotFoundException()
    }
  }

  async listarPagosClientePorMes(cuota:Types.ObjectId){
    const fecha= new Date()
    const pagos= await this.PagosModel.find(
      {cuotas:new Types.ObjectId(cuota), 
        fechaPago:{$lte:fecha}
      }).sort({numeroDeCuota:-1})
      .limit(6)
      .exec()  
   const total= await this.calcularMontoTotalPagos(cuota)
    const pagosPendientes= this.calcularPagosPendiente(pagos) 
    const montoRestante= await this.calcularMontoRestantePago(cuota)
    return {
      total,
      montoRestante,
      totalApagar: pagosPendientes,
      pagos

    }
  }


  calcularPagosPendiente(pagos:Pago[]):number{
    const Pendientes= pagos.filter(pagos => pagos.estadoPago == EstadoPago.Pendiente)
    const totalPendientes= Pendientes.reduce((total, pagos)=> {
      return total + pagos.totalPagado
    },0)
    return totalPendientes
  }

  calcularPagosPagados(pagos:Pago[]):number{
    const Pagados = pagos.filter(pagos => pagos.estadoPago == EstadoPago.Pagado)
    const totaPagados= Pagados.reduce((total, pagos)=> {
      return total + pagos.totalPagado
    },0)
    return totaPagados

  }
  async calcularMontoTotalPagos(cuota:Types.ObjectId){
    const pagos= await this.PagosModel.find({cuotas:new Types.ObjectId(cuota)})
   const total= pagos.reduce((total, pagos)=>{
      return total + pagos.totalPagado
    },0)
    return total
  }

  async calcularMontoRestantePago(cuota:Types.ObjectId){
    const pagos= await this.PagosModel.find({cuotas:new Types.ObjectId(cuota)})
    const pendientes = pagos.filter((pagos)=> pagos.estadoPago === EstadoPago.Pendiente)
    const totalPagosPendientes= pendientes.reduce((total, pagos) =>{
      return  total + pagos.totalPagado
    }, 0)
    return totalPagosPendientes
  }

}
