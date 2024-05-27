import { Module } from '@nestjs/common';
import { CuotasService } from './cuotas.service';
import { CuotasController } from './cuotas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cuota, CuotaSchema } from './schemas/cuota.schema';
import { Pago, PagosSchema } from 'src/pagos/schemas/pago.schema';
import { PagosService } from 'src/pagos/pagos.service';

@Module({
  imports:[

  MongooseModule.forFeature([{name: Cuota.name, schema:CuotaSchema},{name:Pago.name, schema:PagosSchema} ])
  ],
  controllers: [CuotasController],
  providers: [CuotasService],
  exports:[CuotasService]
})
export class CuotasModule {}
