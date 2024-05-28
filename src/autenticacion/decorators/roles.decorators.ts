import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "../constants/autenticacion.constants";
import { Rol } from "../enums/autenticacion.enum";

export const Roles = (rol:Rol[])=>SetMetadata(ROLES_KEY, rol)