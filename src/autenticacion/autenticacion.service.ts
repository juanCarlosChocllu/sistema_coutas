import { Injectable, NotFoundException, ConflictException, HttpStatus } from '@nestjs/common';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto';
import { UpdateAutenticacionDto } from './dto/update-autenticacion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './schemas/autenticacion.schema';
import { Model, Types } from 'mongoose';
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { loginAutenticacionDto } from './dto/login-autenticacion.dto';
import { PaginacionDto } from './dto/paginacion.usuarios.dto';
import { Flag, IsActive, Rol } from './enums/autenticacion.enum';

@Injectable()
export class AutenticacionService {
  constructor(
    @InjectModel(Usuario.name) private UsuarioModel:Model<Usuario>,
    private jwtService:JwtService
  ){

  }

  async create(createAutenticacionDto: CreateAutenticacionDto) {

      createAutenticacionDto.password = await bcrypt.hash(createAutenticacionDto.password, 10) 
      const cedulaIdentidad = await this.UsuarioModel.findOne({cedulaIdentidad:createAutenticacionDto.cedulaIdentidad}).exec()
      const username = await this.UsuarioModel.findOne({username:createAutenticacionDto.username}).exec()
      if( cedulaIdentidad !== null || username !== null){
        if(cedulaIdentidad){
          throw new ConflictException('Ya existe la cedula de identidad')
        }
        if(username){
          throw new ConflictException('ya existe el usuario')
        }
      
      }else{
        const usuario = this.UsuarioModel.create(createAutenticacionDto)
        return  usuario
      }   
  }
  async login(loginAutenticacionDto: loginAutenticacionDto){
    
    const usuario = await this.UsuarioModel.findOne({username:loginAutenticacionDto.username, is_active:IsActive.Activo, flag:Flag.Nuevo}).exec()
    if(!usuario){

      throw new NotFoundException('Credenciales invalidas')
    }
    const crendencialesValida= await bcrypt.compare(loginAutenticacionDto.password, usuario.password)
    if(!crendencialesValida){
      throw new NotFoundException('Credenciales invalidas')
  
       }
       const token = this.jwtService.sign({id:usuario._id})
      const  resultado={
        success:true,
        data:{rol:usuario.rol, nombre:usuario.nombres , apellidos: usuario.apellidos},
        token: token
    }
    return resultado
    
    
  }

  async findAllClientes(paginacionDto:PaginacionDto) {
    const {pagina, limite, buscar}=paginacionDto
    const paginaNumero= Number(pagina) || 1
    const limiteNumero= Number(limite) || 20

    const filtrador:any={rol:Rol.cliente, is_active:IsActive.Activo, flag:Flag.Nuevo}
    if(buscar){
      filtrador.$or=[
        {cedulaIdentidad:{$regex:buscar, $options:'i'}},
        {nombres:{$regex:buscar, $options:'i'}}
      ]
    }
    const totalUsuarios= await this.UsuarioModel.countDocuments(filtrador).exec()
    const totalPaginas = Math.ceil(totalUsuarios/ limiteNumero)
    const clientes =await this.UsuarioModel.find(filtrador)
    .skip((paginaNumero - 1) * limiteNumero)
    .limit(limiteNumero)
    .exec()
    return {
      data:clientes,
      paginas:totalPaginas
    };
  }

  async findAllAdministradores(paginacionDto:PaginacionDto) { 
    const {pagina, limite, buscar}=paginacionDto
    const paginaNumero= Number(pagina) || 1
    const limiteNumero= Number(limite) || 20
  
    const filtrador:any={rol:Rol.Admin, is_active:IsActive.Activo, flag:Flag.Nuevo}
    if(buscar){
      filtrador.$or=[
        {cedulaIdentidad:{$regex:buscar, $options:'i'}},
        {nombres:{$regex:buscar, $options:'i'}}
      ]
    }
    const totalUsuarios= await this.UsuarioModel.countDocuments(filtrador).exec()
    const totalPaginas = Math.ceil(totalUsuarios/ limiteNumero)
    const administradores =await this.UsuarioModel.find(filtrador)
    .skip((paginaNumero - 1) * limiteNumero)
    .limit(limiteNumero)
    .sort({createdAt:-1})
    .exec()
    return {
      data:administradores,
      paginas:totalPaginas
    };
    
  }


   async findOne(id: string) { // lista usuarios por diferente rol
    const usuario = await this.UsuarioModel.findById(id).exec()
    if(!usuario){
      throw new NotFoundException()
    }
    return usuario ;
  }


  async findOneCliente(id:string):Promise<Usuario>{ //lista solo clientes y adminostradores
   try {
    const cliente= await this.UsuarioModel.findById( new Types.ObjectId(id)).exec()
    if(!cliente){
      throw new NotFoundException()
    }
    return cliente
   } catch (error) {
    throw new NotFoundException()
    
   }

  }

 async buscarUsuarioResposablePago(id:Types.ObjectId){
   const usuarioResponsable =await this.UsuarioModel.findOne(new  Types.ObjectId(id)).exec()   
   return usuarioResponsable

 }  

 
  async update(id: string, updateAutenticacionDto: UpdateAutenticacionDto) {
    
    try {
      const usuario=await this.UsuarioModel.findById(new Types.ObjectId(id)).exec()    
      if(!usuario){
        throw new NotFoundException()

      }

      await this.UsuarioModel.findByIdAndUpdate({_id:new Types.ObjectId(id)},updateAutenticacionDto, {new:true})
     return {
      statusCode: HttpStatus.OK
     }
    } catch (error) {
      throw new NotFoundException()
      
    }
  
    
  }

  

  async softDelele(id: string) {
    try {
      const cliente= await this.UsuarioModel.findById(new Types.ObjectId(id)).exec()
      if(!cliente){
        throw new NotFoundException()
      }
    return await this.UsuarioModel.updateOne({_id:new Types.ObjectId(id)},{flag: Flag.Eliminado})
    } catch (error) {
      throw new NotFoundException()
      
    }
  }

  async desactivarCuenta(id:string){
    try{
    const usuario= await this.UsuarioModel.findById(new Types.ObjectId(id)).exec()
    if(!usuario){
      throw new NotFoundException()
    }
  return await this.UsuarioModel.updateOne({_id:new Types.ObjectId(id)},{is_active:IsActive.Inactivo})
  } catch (error) {
    throw new NotFoundException() 
  }
  }


  async contarTotalClientes(){
    const clientes = await this.UsuarioModel.countDocuments({flag:Flag.Nuevo, rol:Rol.cliente})
    return clientes
  }

}
