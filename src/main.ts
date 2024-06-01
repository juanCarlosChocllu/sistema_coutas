import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true, 
    exceptionFactory:(e)=>{
        const error= e.map((error)=>{
          return {
            propiedad :error.property,
            error :Object.values(error.constraints)
          }
        })
        throw new BadRequestException(error)
    }
  }))
  const config= new DocumentBuilder()
  .setTitle('Api cobros')
    .setDescription('Apis de cobros para oc')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('doc', app, document)
  await app.listen(3001);
}
bootstrap();
