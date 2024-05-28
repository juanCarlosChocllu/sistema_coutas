import { HttpCode, Injectable, NotFoundException , HttpStatus} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectModel} from '@nestjs/mongoose';
import { Producto } from './schemas/producto.schema';
import { Model, Types } from 'mongoose';
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
    const limiteNumber = Number(limite) || 20
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
      .sort({createdAt:-1})
      .exec()
    return  {
        productos: productos,
        paginas: cantidadPaginas
    };
  }

  async  findOne(id: string) {
      try {
        const producto= await this.ProductoModel.findById(new Types.ObjectId(id)).exec()  
        if(!producto){
          
          throw new NotFoundException()
        }
        return this.ProductoModel.findById(new Types.ObjectId(id)).exec()
      } catch (error) {
        throw new NotFoundException()    
      }
  }

  async update(id: string, updateProductoDto: UpdateProductoDto) {
    try {
      const producto= await this.ProductoModel.findById(new Types.ObjectId(id)).exec()
      if(!producto){
        throw new NotFoundException()
      }
      return await this.ProductoModel.findByIdAndUpdate(new Types.ObjectId(id), updateProductoDto,{new:true})
      
    } catch (error) {
      throw new NotFoundException()
      
      
    }
  }

   async softDelete(id: string) {
     try {
      const producto = await this.ProductoModel.findOne({_id:new Types.ObjectId(id), flag: Flag.Nuevo}).exec()    
      if(!producto){
        throw new NotFoundException()
      }
      
     await this.ProductoModel.updateOne({_id: new Types.ObjectId(id)},{flag: Flag.Eliminado});
      return {
        statusCode:HttpStatus.OK
      }
     } catch (error) {
        throw new NotFoundException()
     }
  }
}
