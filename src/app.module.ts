import { Module } from '@nestjs/common';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import {MongooseModule} from '@nestjs/mongoose'
import { ProductosModule } from './productos/productos.module';
import { CuotasModule } from './cuotas/cuotas.module';
import { PagosModule } from './pagos/pagos.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/bd_sistema_cuotas') 
  ,AutenticacionModule,
   ProductosModule,
   CuotasModule,
   PagosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
