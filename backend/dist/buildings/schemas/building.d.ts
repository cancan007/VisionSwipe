/// <reference types="node" />
import mongoose from 'mongoose';
import { Document } from 'mongoose';
export declare type BuildingDocument = Building & Document;
declare type ImageType = {
    data: Buffer;
    contentType: string;
};
export declare class Building {
    name: string;
    nameJP?: string;
    company: string;
    companyJP?: string;
    companyUrl: string;
    images: Array<ImageType>;
    address: string;
    addressJP?: string;
    country: string;
    state: string;
    city: string;
    contractType: string;
    price: number;
    priceUnit: string;
}
export declare const BuildingSchema: mongoose.Schema<Building, mongoose.Model<Building, any, any, any>, any, any>;
export {};
