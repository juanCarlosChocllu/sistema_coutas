import { Types } from "mongoose"

export class CreateCuotaDto {
    
    producto:Types.ObjectId
    
    usuario:Types.ObjectId

    montoTotal:number

    cantidadCoutas:number

    montoPagar:number

    estadoCouta:string
}
