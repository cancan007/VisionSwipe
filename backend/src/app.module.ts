/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // to let nest realize development.env and production.env
import { configuration } from './config/configuration';
import { BuildingsModule } from './modules/buildings/buildings.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeModule } from './modules/stripe/stripe.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { KakuregaController } from './modules/kakurega/kakurega.controller';
import { KakuregaService } from './modules/kakurega/kakurega.service';
import { KakuregaModule } from './modules/kakurega/kakurega.module';
import { UserController } from './modules/user/user.controller';
import { UserService } from './modules/user/user.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../build'),
    }),

    ConfigModule.forRoot({
      envFilePath: `./src/config/env/${process.env.NODE_ENV}.env`,
      load: [configuration],
      isGlobal: true,
    }),
    // to use env variables, you should put ConfigModule first before using env variables
    MongooseModule.forRoot(
      configuration().NODE_ENV === 'production'
        ? configuration().MONGODB_URI
        : 'mongodb://localhost:27017/visionswipe',
      { useNewUrlParser: true, useUnifiedTopology: true },
    ),
    BuildingsModule,
    StripeModule,
    KakuregaModule,
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
