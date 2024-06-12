import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Producto, ProductoSchema } from './schemas/producto.schema';
import { AutenticacionModule } from 'src/autenticacion/autenticacion.module';

@Module({
  imports:[
    MongooseModule.forFeature(
      [
       {name:Producto.name, schema:ProductoSchema }
       ]
      ), AutenticacionModule],
  controllers: [ProductosController],
  providers: [ProductosService],
  exports:[ProductosService]
})
export class ProductosModule {}
