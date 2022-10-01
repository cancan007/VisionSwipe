/* eslint-disable prettier/prettier */
export class AddBuilding {
  name: string;
  nameJP?: string;
  company: string;
  companyJP?: string;
  readonly companyUrl: string;
  images?: Array<{ data: Buffer; contentType: string }>;
  address: string;
  addressJP ?: string;
  country:string;
  state:string;
  city:string;
  contractType:string;
  price: number;
  priceUnit: string;
}

export class FetchBuildings{
    country?:string;
    state?:string;
    city?:string
    contractType?:string;
}
