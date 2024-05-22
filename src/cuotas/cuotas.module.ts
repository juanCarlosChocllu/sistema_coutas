import { Module } from '@nestjs/common';
import { CuotasService } from './cuotas.service';
import { CuotasController } from './cuotas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cuota, CuotaSchema } from './schemas/cuota.schema';

@Module({
  imports:[

  MongooseModule.forFeature([{name: Cuota.name, schema:CuotaSchema}])
  ],
  controllers: [CuotasController],
  providers: [CuotasService],
})
export class CuotasModule {}
