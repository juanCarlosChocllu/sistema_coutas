import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectModel} from '@nestjs/mongoose';
import { Producto } from './schemas/producto.schema';
import { Model } from 'mongoose';
import { Flag } from './enums/productos.enum';
import { PaginacionDto } from './dto/paginacion-producto.dto';
@Injectable()
export class ProductosService {
  constructor(@InjectModel(Producto.name) private ProductoModel: Model<Producto>
  ){
  }
  async create(createProductoDto: CreateProductoDto) {
    const producto=await this.ProductoModel.create(createProductoDto)
    return producto.save();
  }

  async findAll(paginacionDto:PaginacionDto) {
    const {pagina, limite, buscar}= paginacionDto

    const paginaNumber= Number(pagina) || 1
    const limiteNumber = Number(limite) || 10
    const filtrador:any={flag:Flag.Nuevo}

    if(buscar){
      filtrador.$or=[
        {nombreProducto:{$regex:buscar, $options:'i'}},
      ]
    }
    const paginas= await this.ProductoModel.countDocuments(filtrador).exec()
    const cantidadPaginas= Math.ceil(paginas / limiteNumber)
    const productos = await this.ProductoModel.find(filtrador)
      .skip((paginaNumber -1) * limiteNumber)
      .limit(limiteNumber)
      .exec()
    return  {
        productos: productos,
        paginas: cantidadPaginas
    };
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
