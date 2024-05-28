import { Module } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { GastosController } from './gastos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Gasto ,GastoSchema} from './schemas/gasto.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Gasto.name, schema: GastoSchema}])],
  controllers: [GastosController],
  providers: [GastosService],
})
export class GastosModule {}
