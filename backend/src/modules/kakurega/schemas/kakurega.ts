/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import Joi, { number } from 'joi';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KakuregaDocument = Kakurega & Document;
export type KakuregaRoomDataDocument = KakuregaRoomData & Document;

@Schema({ collection: 'kakurega' })
export class Kakurega {
  @Prop({
    required: true,
  })
  season: number;
  @Prop({
    required: true,
  })
  prices: [[number]];
  @Prop({
    required: true,
  })
  rooms: [number];
  @Prop()
  roomDatas: typeof KakuregaRoomDataSchema[];
}

@Schema({ collection: 'kakurega-room' })
export class KakuregaRoomData {
  @Prop({
    required: true,
  })
  year: number;
  @Prop({
    required: true,
  })
  month: number;
  @Prop({
    required: true,
  })
  day: number;
  @Prop({
    required: true,
  })
  rooms: number[];
}

export const KakuregaSchema = SchemaFactory.createForClass(Kakurega);
export const KakuregaRoomDataSchema =
  SchemaFactory.createForClass(KakuregaRoomData);
