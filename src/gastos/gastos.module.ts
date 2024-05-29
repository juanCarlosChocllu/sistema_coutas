import { Module } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { GastosController } from './gastos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Gasto ,GastoSchema} from './schemas/gasto.schema';
import { AutenticacionModule } from 'src/autenticacion/autenticacion.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Gasto.name, schema: GastoSchema}]), AutenticacionModule],
  controllers: [GastosController],
  providers: [GastosService],
})
export class GastosModule {}
