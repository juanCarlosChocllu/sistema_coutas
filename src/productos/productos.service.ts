import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectModel} from '@nestjs/mongoose';
import { Producto } from './schemas/producto.schema';
import { Model } from 'mongoose';
import { Flag } from './enums/productos.enum';
@Injectable()
export class ProductosService {
  constructor(@InjectModel(Producto.name) private ProductoModel: Model<Producto>
  ){
  }
  async create(createProductoDto: CreateProductoDto) {
    const producto=await this.ProductoModel.create(createProductoDto)
    return producto.save();
  }

  findAll() {
    return  this.ProductoModel.find({flag:Flag.Nuevo});
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

   async softDelete(id: string) {
    const producto = await this.ProductoModel.findOne({_id:id, flag: Flag.Nuevo}).exec()
    if(!producto){
      throw new NotFoundException('El producto no existe')
    }
    return await this.ProductoModel.updateOne({_id:id},{flag: Flag.Eliminado}) ;
  }
}
