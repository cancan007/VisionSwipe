import mongoose from 'mongoose';
import { Document } from 'mongoose';
export declare type KakuregaDocument = Kakurega & Document;
export declare type KakuregaRoomDataDocument = KakuregaRoomData & Document;
export declare class Kakurega {
    season: number;
    prices: [[number]];
    rooms: [number];
    roomDatas: (typeof KakuregaRoomDataSchema)[];
}
export declare class KakuregaRoomData {
    year: number;
    month: number;
    day: number;
    rooms: number[];
}
export declare const KakuregaSchema: mongoose.Schema<Kakurega, mongoose.Model<Kakurega, any, any, any>, any, any>;
export declare const KakuregaRoomDataSchema: mongoose.Schema<KakuregaRoomData, mongoose.Model<KakuregaRoomData, any, any, any>, any, any>;
