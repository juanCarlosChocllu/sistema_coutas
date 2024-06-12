import { Module } from '@nestjs/common';
import { AutenticacionModule } from './autenticacion/autenticacion.module';
import {MongooseModule} from '@nestjs/mongoose'
import { ProductosModule } from './productos/productos.module';
import { CuotasModule } from './cuotas/cuotas.module';
import { PagosModule } from './pagos/pagos.module';
import { GastosModule } from './gastos/gastos.module';
import { ConfigModule } from '@nestjs/config';
import { coneccionMongo } from './config/coneccion-db';
import { EstadisticaModule } from './estadistica/estadistica.module';


@Module({
  imports: [
   ConfigModule.forRoot({isGlobal: true}) ,
  MongooseModule.forRoot(coneccionMongo) 
  ,AutenticacionModule,
   ProductosModule,
   CuotasModule,
   PagosModule,
   GastosModule,
   EstadisticaModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
