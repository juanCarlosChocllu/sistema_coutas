import { Module } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { AutenticacionController } from './autenticacion.controller';
import {MongooseModule} from '@nestjs/mongoose'
import { Usuario, UsuarioSchema } from './schemas/autenticacion.schema';
import {jwtConstants} from './constants/autenticacion.constants'
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports :[ 
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions:{expiresIn:'5h'}
    }),

    MongooseModule.forFeature(
      [{name:Usuario.name, schema:UsuarioSchema}])
  ],
  controllers: [AutenticacionController],
  providers: [AutenticacionService],
})
export class AutenticacionModule {}
