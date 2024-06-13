import { BadRequestException, HttpStatus, Injectable, NotFoundException, RequestTimeoutException, UseGuards } from '@nestjs/common';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cuota } from './schemas/cuota.schema';
import { Model, Types } from 'mongoose';
import { PaginacionDto } from './dto/paginacion.cuotas';
import { EstadoCuota, Flag } from './enums/enum.cuotas';
import { Pago} from 'src/pagos/schemas/pago.schema';
import { EstadoPago } from 'src/pagos/enums/pago.enum';
import { calcularMontoPorMes } from './utils/redondear-utils';
import { desEstructuraFecha } from './utils/des-estructurar-fecha.util';

@Injectable()
export class CuotasService {
  constructor(
    @InjectModel(Cuota.name) private CuotaModel:Model<Cuota>,
    @InjectModel(Pago.name) private PagosMoldel:Model<Pago>
  
  ){}


 async create(createCuotaDto: CreateCuotaDto) {
  createCuotaDto.montoPagar=  calcularMontoPorMes(createCuotaDto.montoTotal, createCuotaDto.cantidadCuotas)
  const cuota= await this.CuotaModel.create(createCuotaDto)
   await cuota.save()  
  const [año, mes, dia] = desEstructuraFecha(createCuotaDto.fechaDePago)  
   for(let contador =0; contador < createCuotaDto.cantidadCuotas; contador ++ ){    
      const fechaVencimiento = new Date(año, mes, dia);
      fechaVencimiento.setMonth(fechaVencimiento.getMonth() + contador)
      const pagos= await this.PagosMoldel.create({
      cuotas:cuota._id,
      fechaPago: fechaVencimiento.toDateString(),
      totalPagado: cuota.montoPagar,
      numeroDeCuota:contador + 1
    }
    )
    await pagos.save()
   }

    return  HttpStatus.CREATED ;
  }






  async vericarCuotaCompletada(cuota:Types.ObjectId){      
   const  cuotas = await this.CuotaModel.find({_id:cuota}).exec()
  for (const cuota of cuotas){
    let totalCuota= 0
   const cuotasPagadas = await  this.PagosMoldel.find({estadoPago:EstadoPago.Pagado, cuotas:cuota._id})
    for (const total of cuotasPagadas){
         totalCuota  +=  total.totalPagado 
    }
     const verificaTotalPagado= await this.CuotaModel.findById(cuota._id)
     if(verificaTotalPagado.montoTotal === totalCuota){
        await this.CuotaModel.findByIdAndUpdate(cuota.id, {estadoCouta:EstadoCuota.Pagado})
     }
      
  }
    
  }

  async listarCuotasCliente(usuario: Types.ObjectId, paginacionDto: PaginacionDto) { 
    const { pagina, limite, producto, fechaBusqueda} = paginacionDto;
    let cuotas:string[];//se le asipna los resultados por porducto o popr fecha    
    const paginaNumero = Number(pagina) || 1;
    const limiteNumero = Number(limite) || 6;
    const filtrador: any = { usuario: new Types.ObjectId(usuario) };
    
    try {
      if (fechaBusqueda) {
        const [año, mes, dia] = fechaBusqueda.split('-');
        const fechaInicio = new Date(parseInt(año), parseInt(mes) - 1, parseInt(dia));
        const fechaFin = new Date(parseInt(año), parseInt(mes) - 1, parseInt(dia) + 1);
        filtrador.createdAt = {
          $gte: fechaInicio,
          $lt: fechaFin
        };      
      }
      if (producto) {
        cuotas = await this.buscarCuotasPorNombreDeProductos(paginaNumero, limiteNumero, producto)    
      } else {
        cuotas = await this.buscarCuotasPorFechaOusuario(filtrador, paginaNumero, limiteNumero)
      }
      const totalCuotas = await this.CuotaModel.countDocuments(filtrador).exec();
      const totalPaginas = Math.ceil(totalCuotas / limiteNumero);
  
      return {
        cuotas,
        pagina: totalPaginas
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
  

  async contarTodasLasCuotas(){ //cuenta todas las cuotas existentes
    const cuotas = await this.CuotaModel.countDocuments({flag:Flag.Nuevo})
    return cuotas 
     
  }


  async cuotasPagasCompletadas(){
    const cuota = await this.CuotaModel.find({flag:Flag.Nuevo, estadoCouta:EstadoCuota.Pagado}).exec()
  return cuota
  }

  private async buscarCuotasPorNombreDeProductos( paginaNumero:number, limiteNumero:number, producto:string){
  const  cuotas = await this.CuotaModel.aggregate([
      {
        $lookup: {
          from: "productos",
          localField: "producto",
          foreignField: "_id",
          as: "producto"
        }
      },
      {
        $match: {
        
          "producto.nombreProducto": { $regex: new RegExp(producto, "i") }
        }
      },
      {
        $skip: (paginaNumero - 1) * limiteNumero
      },
      {
        $limit: limiteNumero
      }
    ]);
    return cuotas 
  }

  private async buscarCuotasPorFechaOusuario( filtrador:{}, paginaNumero:number, limiteNumero:number){//muestra las cuotas por usuario o por  fecha
   const cuotas = await this.CuotaModel.aggregate([
      {
        $lookup: {
          from: "productos",
          localField: "producto",
          foreignField: "_id",
          as: "producto"
        }
      },
      {
        $match: filtrador
      },
      {
        $skip: (paginaNumero - 1) * limiteNumero
      },
      {
        $limit: limiteNumero
      }
    ]);

    return cuotas
  }
}
