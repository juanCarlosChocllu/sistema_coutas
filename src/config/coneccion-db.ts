import { ConfigModule, ConfigService } from '@nestjs/config';



ConfigModule.forRoot({isGlobal:true})
const configService= new  ConfigService()
const enlaceMongo=configService.get('DATABASE_CONECTION')
const enlaceMongoDev=configService.get('DATABASE_CONECTION_DEV')
export const coneccionMongo= enlaceMongo