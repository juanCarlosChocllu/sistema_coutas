import { Module } from '@nestjs/common';
import { PagosService } from './pagos.service';
import { PagosController } from './pagos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pago, PagosSchema } from './schemas/pago.schema';
import {CuotasModule} from '../cuotas/cuotas.module'
@Module({
  imports:[MongooseModule.forFeature(
    [{name:Pago.name , schema:PagosSchema}]), CuotasModule],
  
  controllers: [PagosController],
  providers: [PagosService],
})
export class PagosModule {}
