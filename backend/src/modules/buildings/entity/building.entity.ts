/* eslint-disable prettier/prettier */
export interface BuildingEnt{
    //id:string;
    _id:string;  // mongoDB generate unique Id default
    name: string;
  nameJP?: string;
  company: string;
  companyJP?: string;
  companyUrl: string;
  images?: Array<{ data: Buffer; contentType: string }>;
  address: string;
  addressJP?: string;
  country:string;
  state:string;
  city:string;
  contractType:string;
  price: number;
  priceUnit: string;
}