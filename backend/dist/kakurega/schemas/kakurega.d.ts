import mongoose from 'mongoose';
import { Document } from 'mongoose';
export declare type KakuregaDocument = Kakurega & Document;
export declare class Kakurega {
    season: number;
    prices: [[number]];
    rooms: [number];
}
export declare const KakuregaSchema: mongoose.Schema<Kakurega, mongoose.Model<Kakurega, any, any, any>, any, any>;
