import { Module } from '@nestjs/common';
import { EstadisticaController } from './estadistica.controller';
import { EstadisticaService } from './estadistica.service';
import { CuotasModule } from 'src/cuotas/cuotas.module';
import { ProductosModule } from 'src/productos/productos.module';
import { AutenticacionModule } from 'src/autenticacion/autenticacion.module';
@Module({
  imports: [CuotasModule, ProductosModule, AutenticacionModule, AutenticacionModule], 
  controllers: [EstadisticaController],
  providers: [EstadisticaService]
})
export class EstadisticaModule {}
