/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
import Joi, { number } from 'joi';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BuildingDocument = Building & Document;

/*
type BuildingType = {
  name: string,
  nameJP?:string,
  company: string,
  companyJP?: string,
  companyUrl:string,
  images:Array<{data: Buffer,contentType: string}>,
  address: string,
  addressJP?:string,
  price:number,
  priceUnit:string
}*/

type ImageType ={data: Buffer,contentType: string}
interface IImage{data: Buffer,contentType: string}
const imageSchema = new mongoose.Schema<IImage>(
    {data: Buffer,contentType: String}
)

/*
interface IBuilding {
    name: string,
    nameJP?:string,
    company: string,
    companyJP?: string,
    companyUrl:string,
    images:Array<ImageType>,
    address: string,
    addressJP?:string,
    price:number,
    priceUnit:string
}*/

@Schema()
export class Building {
  @Prop({
    type: String,
    required: true,
    min:2
  })
  name: string;
  @Prop()
    nameJP?:string;
  @Prop({
      type: String,
      required: true,
      min:2
    })
    company: string;
  @Prop()
    companyJP?: string;
  @Prop({
      type: String,
      required: true,
      min: 5,
    })
    companyUrl:string;
  @Prop({
      type:[imageSchema]
    })
    images:Array<ImageType>;
  @Prop({
      type: String,
      required: true,
      min: 5,
    })
    address: string;
  @Prop({
      type:String,
      required:true,
      min:5
    })
    addressJP?:string;
  @Prop({
      type:String,
    required:true
    })
    country:string;
  @Prop({
      type:String,
      required:true
    })
    state:string;
  @Prop({
      type:String,
      required:true
    })
    city:string;
  
  @Prop({
      type:String,
      required:true
    })
    contractType:string;
  @Prop({
      type:Number,
      required:true,
      min:0
    })
    price:number;
  @Prop({
      type:String,
      required:true,
      min:1
    })
    priceUnit:string;
}

export const BuildingSchema = SchemaFactory.createForClass(Building);
/*
export const buildingSchema = new mongoose.Schema<IBuilding>({
  name: {
    type: String,
    required: true,
    min:2
  },
  nameJP: {
    type: String
  },
  company: {
    type: String,
    required: true,
    min:2
  },
  companyJP: {
    type: String
  },
  companyUrl: {
    type: String,
    required: true,
    min: 5,
  },
  images:{
    type:[imageSchema]
  },
  address: {
    type: String,
    required: true,
    min: 5,
  },
  addressJP:{
    type:String,
    required:true,
    min:5
  },
  price:{
    type:Number,
    required:true,
    min:0
  },
  priceUnit:{
    type:String,
    required:true,
    min:1
  }
});*/
