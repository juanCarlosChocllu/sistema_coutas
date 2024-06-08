import { ConfigModule, ConfigService } from '@nestjs/config';



ConfigModule.forRoot({isGlobal:true})
const configService= new  ConfigService()
const enlaceMongo=configService.get<string>('DATABASE_CONECTION')
const enlaceMongoDev=configService.get<string>('DATABASE_CONECTION_DEV')
export const coneccionMongo= enlaceMongoDev