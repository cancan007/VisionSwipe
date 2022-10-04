/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';  // to let nest realize development.env and production.env
import { configuration } from './config/configuration';
import { BuildingsModule } from './buildings/buildings.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeModule } from './stripe/stripe.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/visionswipe'),
    ConfigModule.forRoot({
    envFilePath: `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`,
    load: [configuration] 
}), BuildingsModule, StripeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
