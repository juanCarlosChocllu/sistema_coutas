import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import {MongooseModule} from '@nestjs/mongoose'
import { Usuario, UsuarioSchema } from './schemas/autenticacion.schema';
import {jwtConstants} from './constants/autenticacion.constants'
import { JwtModule } from '@nestjs/jwt';
import { RolAutenticacionGuard } from './guards/rol.autenticacion.guard';
import { tokenAutenticacionGuard } from './guards/token.autenticacion.guard';
@Module({
  imports :[
    MongooseModule.forFeature(
      [{name:Usuario.name, schema:UsuarioSchema}]),
      JwtModule.register({
        global:true,
        secret: jwtConstants.secret,
        signOptions:{expiresIn:'5h'}
      }),
  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService, RolAutenticacionGuard, tokenAutenticacionGuard],
  exports :[RolAutenticacionGuard, tokenAutenticacionGuard, AutenticacionService]
})
export class AutenticacionModule {}
