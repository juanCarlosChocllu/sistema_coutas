import { Injectable } from '@nestjs/common';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GastosModule } from './gastos.module';
import { Model, Types } from 'mongoose';
import { Gasto } from './schemas/gasto.schema';
import { EstadoGasto, Flag } from './enums/enum-gastos';

@Injectable()
export class GastosService {
  constructor(@InjectModel(Gasto.name) private gastoModel:Model<Gasto> ){}

  async create(createGastoDto: CreateGastoDto) {
    const gasto= await this.gastoModel.create(createGastoDto)
    return gasto.save() ;
  }

  findAll() {
    return `This action returns all gastos`;
  }

  findOneAll(id: Types.ObjectId) {
    return  this.gastoModel.find({estadoPago:EstadoGasto.Pendiente, flag:Flag.Nuevo
    }).sort({createAt:-1}).exec();
  }

  update(id: number, updateGastoDto: UpdateGastoDto) {
    return `This action updates a #${id} gasto`;
  }

  remove(id: number) {
    return `This action removes a #${id} gasto`;
  }
}
