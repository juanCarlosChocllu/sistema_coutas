import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "../constants/autenticacion.constants";

export const Roles = (rol:string)=>SetMetadata(ROLES_KEY, rol)