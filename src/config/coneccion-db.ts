import { ConfigModule, ConfigService } from '@nestjs/config';



ConfigModule.forRoot({isGlobal:true})
const configService= new  ConfigService()
const enlaceMongo=configService.get('DATABASE_CONECTION')
console.log(enlaceMongo);



export const coneccionMongo= enlaceMongo