import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AutenticacionService } from "../autenticacion.service";

@Injectable()
export class RolAutenticacionGuard implements CanActivate{
    constructor(private autenticacionService:AutenticacionService){}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>()
        
        const usuario = await this.autenticacionService.findOne(request['idUsuario'])
        
        
        return true
    }

}