/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KakuregaController } from './kakurega.controller';
import { KakuregaService } from './kakurega.service';
import { KakuregaSchema } from './schemas/kakurega';

@Module({
    imports: [MongooseModule.forFeature([{name:"kakurega", schema:KakuregaSchema}])],
    controllers: [KakuregaController],
    providers: [KakuregaService],
  })
export class KakuregaModule {}
