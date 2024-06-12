import { Controller, Get, UseGuards } from '@nestjs/common';
import { EstadisticaService } from './estadistica.service';
import { ApiTags } from '@nestjs/swagger';
import { tokenAutenticacionGuard } from 'src/autenticacion/guards/token.autenticacion.guard';
import { RolAutenticacionGuard } from 'src/autenticacion/guards/rol.autenticacion.guard';
import { Roles } from 'src/autenticacion/decorators/roles.decorators';
import { Rol } from 'src/autenticacion/enums/autenticacion.enum';

@ApiTags('estadistica')
@UseGuards(tokenAutenticacionGuard, RolAutenticacionGuard)
@Controller('estadistica')
export class EstadisticaController {
    constructor(private readonly estadisticaService :EstadisticaService){}

    @Roles([Rol.Admin])
    @Get('total')
    contarTodosLosServiciosTotal(){ 
        return  this.estadisticaService.contarTodosLosServiciosTotal()

    }

}
