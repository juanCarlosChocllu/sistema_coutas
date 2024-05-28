import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AutenticacionService } from "../autenticacion.service";
import { Reflector } from "@nestjs/core";
import { Rol } from "../enums/autenticacion.enum";
import { ROLES_KEY } from "../constants/autenticacion.constants";


@Injectable()
export class RolAutenticacionGuard implements CanActivate{
    constructor(private autenticacionService:AutenticacionService,
        private reflector:Reflector
    ){}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>()
        const usuario = await this.autenticacionService.findOne(request['idUsuario'])
        const roles = this.reflector.get<Rol[]>(ROLES_KEY, context.getHandler())
        const verificarRoles = roles.some((role)=> usuario.rol.includes(role));
        return verificarRoles
    }

}