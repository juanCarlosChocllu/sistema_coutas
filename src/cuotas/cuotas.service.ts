import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cuota } from './schemas/cuota.schema';
import { Model, Types } from 'mongoose';
import { PaginacionDto } from './dto/paginacion.cuotas';
import { EstadoCuota, Flag } from './enums/enum.cuotas';
import { Pago} from 'src/pagos/schemas/pago.schema';
import { EstadoPago } from 'src/pagos/enums/pago.enum';

@Injectable()
export class CuotasService {
  constructor(
    @InjectModel(Cuota.name) private CuotaModel:Model<Cuota>,
    @InjectModel(Pago.name) private PagosMoldel:Model<Pago>
  
  ){}


 async create(createCuotaDto: CreateCuotaDto) {
    createCuotaDto.montoPagar= (createCuotaDto.montoTotal / createCuotaDto.cantidadCuotas)  
   const cuota= await this.CuotaModel.create(createCuotaDto)
   await cuota.save()  
   for(let contador =0; contador < createCuotaDto.cantidadCuotas; contador ++ ){
    const fechaVencimiento = new Date(createCuotaDto.fechaDePago)
    const pagos= await this.PagosMoldel.create({
      usuario:createCuotaDto.usuario,
      cuotas:cuota._id,
      fechaPago: fechaVencimiento.setMonth(fechaVencimiento.getMonth() + contador),
      totalPagado: cuota.montoPagar,
      numeroDeCuota:contador + 1
    }
    )
    await pagos.save()
   }
    return  cuota ;
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


  async vericarCuotaCompletada(pagos:string[], usuario:Types.ObjectId){  
   const  cuotas = await this.CuotaModel.find({usuario:usuario}).exec()
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
 
}
