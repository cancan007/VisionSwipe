/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';  // to let nest realize development.env and production.env
import { configuration } from './config/configuration';
import { BuildingsModule } from './buildings/buildings.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeModule } from './stripe/stripe.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const uri = process.env.NODE_ENV === 
"production" ? `mongodb+srv://shota:${process.env.MONGODB_PASSWORD}@cluster-free.mmct5.mongodb.net/?retryWrites=true&w=majority/visionswipe-buildings`
             : 'mongodb://localhost:27017/visionswipe'
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend/build'),
    }),
    MongooseModule.forRoot(uri),
    ConfigModule.forRoot({
    envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
    load: [configuration] 
}), BuildingsModule, StripeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
