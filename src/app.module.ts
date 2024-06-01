import { Module } from '@nestjs/common';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import {MongooseModule} from '@nestjs/mongoose'
import { ProductosModule } from './productos/productos.module';
import { CuotasModule } from './cuotas/cuotas.module';
import { PagosModule } from './pagos/pagos.module';
import { GastosModule } from './gastos/gastos.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://jchocllu:ct0NZCQ3fF2sjeYd@cluster0.t32gysh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0') 
  ,AutenticacionModule,
   ProductosModule,
   CuotasModule,
   PagosModule,
   GastosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
