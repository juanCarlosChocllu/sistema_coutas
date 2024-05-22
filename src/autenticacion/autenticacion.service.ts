import { Injectable, NotFoundException, ConflictException, Delete } from '@nestjs/common';
import { CreateAutenticacionDto } from './dto/create-autenticacion.dto';
import { UpdateAutenticacionDto } from './dto/update-autenticacion.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from './schemas/autenticacion.schema';
import { Model } from 'mongoose';
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { loginAutenticacionDto } from './dto/login-autenticacion.dto';
import { PaginacionDto } from './dto/paginacion.usuarios.dto';
import { Request } from 'express';
import { Rol } from './enums/autenticacion.enum';


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
    
    const usuario = await this.UsuarioModel.findOne({username:loginAutenticacionDto.username}).exec()
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

  async findAll(paginacionDto:PaginacionDto) {
    const {pagina, limite, buscar}=paginacionDto
    const paginaNumero= Number(pagina) || 1
    const limiteNumero= Number(limite) || 20
    const totalUsuarios= await this.UsuarioModel.countDocuments().exec()
    const totalPaginas = Math.ceil(totalUsuarios/ limiteNumero)
    const filtrador:any={rol:Rol.cliente}
    if(buscar){
      filtrador.$or=[
        {cedulaIdentidad:{$regex:buscar, $options:'i'}},
        {nombres:{$regex:buscar, $options:'i'}}
      ]
    }
    const usuarios =await this.UsuarioModel.find(filtrador)
    .skip((paginaNumero - 1) * limiteNumero)
    .limit(limiteNumero)
    .exec()
    return {
      data:usuarios,
      paginas:totalPaginas
    };
  }



  findOne(id: number) {
    return `This action returns a #${id} autenticacion`;
  }

  update(id: number, updateAutenticacionDto: UpdateAutenticacionDto) {
    return `This action updates a #${id} autenticacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} autenticacion`;
  }
}
