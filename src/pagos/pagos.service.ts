import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePagoDto } from './dto/create-pago.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pago } from './schemas/pago.schema';
import { Model, Types } from 'mongoose';
import { EstadoPago } from './enums/pago.enum';
import {CuotasService } from '../cuotas/cuotas.service'
import { AutenticacionService } from 'src/autenticacion/autenticacion.service';
import { PagoInterface } from './interfaces/pago.interface';

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
  
   for(const pago of pagosPendientes){
        const estadoPagoAdelantado = this.vericarPagoAdelantado(pago)//verifica por mes si el pago es adelantado
         const cuotaApagar= await this.PagosModel.findByIdAndUpdate({ //acutliza los estadps cuando se manda el id del pago
            _id:pago._id},
             {estadoPago:EstadoPago.Pagado, usuarioResponsablePago:usuario, pagoAdelantado:estadoPagoAdelantado, fechaCancelacionPago:Date.now()}, {new:true}).exec()     
         cuotasPagadas = cuotasPagadas.concat(cuotaApagar)
      }    
      this.cuotasService.vericarCuotaCompletada(createPagoDto.cuota)
      return cuotasPagadas
  }



 async  buscarPagosNoPendientes(idPagos:Types.ObjectId[], cuota:Types.ObjectId):Promise<PagoInterface[]>{ 
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

     const totalApagar= this.calcularPagosPorEstado(pagos, EstadoPago.Pendiente)
    const pagosPagados= this.calcularPagosPorEstado(pagos, EstadoPago.Pagado)
        
    const cuotasPagadas =await  this.cantidadCuotasPorEstado(new Types.ObjectId(cuota), EstadoPago.Pagado)
    const cuotasPendientes =await  this.cantidadCuotasPorEstado(new Types.ObjectId(cuota), EstadoPago.Pendiente)
      
      return {
        totalApagar,
        cuotasPagadas,
        cuotasPendientes,
        pagosPagados,
        pagos
      }
    } catch (error) {
       throw new NotFoundException()
    }
  }

  async listarPagosClientePorMes(cuota:Types.ObjectId){
    const fecha:Date= new Date()
    const pagos:Pago[]= await this.PagosModel.find(
      {cuotas:new Types.ObjectId(cuota), 
        $or: [
          { fechaPago: { $lte: fecha }, pagoAdelantado: false },
          { pagoAdelantado: true } 
      ]
      }).sort({numeroDeCuota:-1})
      .limit(6)
      .exec()  
   const total= await this.calcularMontoTotalPagos(cuota)
    const pagosPendientes= this.calcularPagosPorEstado(pagos, EstadoPago.Pendiente) 
    const montoRestante= await this.calcularMontoRestantePago(cuota)
    const cantidadCuotasPagadas= await this.cantidadCuotasPorEstado(cuota, EstadoPago.Pagado)
    const cantidadCuotasApagar= await this.cantidadDeCuotas(cuota)
    return {
      total,
      cantidadCuotasApagar,
      cantidadCuotasPagadas,
      montoRestante,
      totalApagar: pagosPendientes,
      pagos

    }
  }


  private calcularPagosPorEstado(pagos:Pago[], estado:EstadoPago):number{ // calcula los pagos depende al estado que se le mande
    const pagosTotal= pagos.filter(pagos => pagos.estadoPago == estado)
    const total= pagosTotal.reduce((total, pagos)=> {
      return total + pagos.totalPagado
    },0)
    return  total
  }


  private async calcularMontoTotalPagos(cuota:Types.ObjectId):Promise<number>{
    const pagos= await this.PagosModel.find({cuotas:new Types.ObjectId(cuota)})
   const total= pagos.reduce((total, pagos)=>{
      return total + pagos.totalPagado
    },0)
    return total
  }

  private async calcularMontoRestantePago(cuota:Types.ObjectId):Promise<number>{
    const pagos= await this.PagosModel.find({cuotas:new Types.ObjectId(cuota)})
    const pendientes = pagos.filter((pagos)=> pagos.estadoPago === EstadoPago.Pendiente)
    const totalPagosPendientes= pendientes.reduce((total, pagos) =>{
      return  total + pagos.totalPagado
    }, 0)
    return totalPagosPendientes
  }

  private async cantidadCuotasPorEstado(cuota:Types.ObjectId, estado:EstadoPago):Promise<number>{ // calcula la cantidad de cuotas por estado
    const pagos= await this.PagosModel.find({cuotas:new Types.ObjectId(cuota), estadoPago:estado})  
    const cantidadPagadas= pagos.length
    return cantidadPagadas
  }

  private async cantidadDeCuotas(cuota:Types.ObjectId):Promise<number>{//calcula la cantidad de cuotas que veine en el array 
    const pagos= await this.PagosModel.find({cuotas:new Types.ObjectId(cuota)})
    const cantidadPagos= pagos.length    
    return cantidadPagos
  }


  private vericarPagoAdelantado(pago:PagoInterface):Boolean{//verifica fechas de pagos
    const fechadePagoCuta:Date= new Date(pago.fechaPago)
    const FechaActual:Date=new Date()
    const estadoPagoAdelantado:Boolean=( Number(fechadePagoCuta.getMonth()) + 1 > Number(FechaActual.getMonth())+ 1) || ( Number(fechadePagoCuta.getFullYear())  > Number(FechaActual.getFullYear()))
    return estadoPagoAdelantado
  }

}
