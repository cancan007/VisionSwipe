/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { configuration } from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    /*,
    new FastifyAdapter()
  {
    rawBody: true,
  }*/
  );
  /*
  if(process.env.NODE_ENV==="production"){
    app.use(mongoose.connect(process.env.MONGODB_URI))
  }*/
  if(configuration().NODE_ENV === "development"){
    app.enableCors({
      origin:["http://localhost:3000"],
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
    })
  } else if(configuration().NODE_ENV === "production"){
    app.enableCors(/*{
      origin: '*',
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  }*/); // protection
  }
  
  
  app.useStaticAssets(join(__dirname, '../frontend/build'));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
