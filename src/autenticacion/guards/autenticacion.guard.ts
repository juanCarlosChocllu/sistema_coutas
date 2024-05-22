import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt'
import { jwtConstants } from '../constants/autenticacion.constants';



@Injectable()
export class  AutenticacionGuard implements CanActivate{
    constructor(private  jwtService:JwtService){}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const autenticacionHeader = request.headers.authorization
        const token = autenticacionHeader.split(' ')[1]
        if(!token){
            throw new UnauthorizedException()
        }
        try {
            const idUsuario=  await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret
            })    
            request['idUsuario']= idUsuario.id
            return true
        } catch (error) {
            throw new UnauthorizedException()   
        }    
    }
}

