import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    /*,
    new FastifyAdapter()
  {
    rawBody: true,
  }*/
  );
  app.useStaticAssets(join(__dirname, '../frontend/build'));
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
