/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import Joi, { number } from 'joi';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type KakuregaDocument = Kakurega & Document;

@Schema({collection: "kakurega"})
export class Kakurega{
    @Prop({
        required:true,
    })
    season: number;
    @Prop({
        required:true
    })
    prices:[[number]];
    @Prop({
        required: true
    })
    rooms:[number];
}

export const KakuregaSchema = SchemaFactory.createForClass(Kakurega);
