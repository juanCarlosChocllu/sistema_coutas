import { ConfigModule, ConfigService } from '@nestjs/config';



ConfigModule.forRoot({isGlobal:true})
const configService= new  ConfigService()
const enlaceMongo:string=configService.get<string>('DATABASE_CONECTION')
const enlaceMongoDev:string=configService.get<string>('DATABASE_CONECTION_DEV')
export const coneccionMongo= enlaceMongo