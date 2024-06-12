import { HttpStatus, Injectable } from '@nestjs/common';
import { AutenticacionService } from 'src/autenticacion/autenticacion.service';
import { CuotasService } from 'src/cuotas/cuotas.service';
import { ProductosService } from 'src/productos/productos.service';

@Injectable()
export class EstadisticaService {
    constructor(
        private  readonly  cuotasService:CuotasService,
        private readonly productosService:ProductosService,
        private readonly autenticacionService:AutenticacionService,
  

    ){}


    async contarTodosLosServiciosTotal(){
        const totalCuotas= await this.contabilizarCuotasTotal()
        const totalProductos = await this.contabilizarProductosTotal()
        const totalClientes =await this.contabilizarClientesTotal()
        const cuotasCompletadas =  await this.totalCuotasPagas()


        return {
            HttpStatus:HttpStatus.OK,
            data:{
                totalCuotas,
                totalProductos,
                totalClientes,
                cuotasCompletadas
            }
        }
    }


    private async contabilizarCuotasTotal(){
       const  totalCuotas= await this.cuotasService.contarTodasLasCuotas()
       return totalCuotas

    }

    private async contabilizarProductosTotal(){
        const productos= await this.productosService.contarproductosTotal()
        return productos
    }

    private  async contabilizarClientesTotal (){
        const cliente = this.autenticacionService.contarTotalClientes()
        return cliente

    }

    private async totalCuotasPagas(){
        const cuotasCompletada = await this.cuotasService.cuotasPagasCompletadas()
        const total = cuotasCompletada.reduce((tota, cuotas)=> tota + cuotas.montoTotal ,0)
        return total
    }
}
