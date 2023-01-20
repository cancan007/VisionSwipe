/// <reference types="node" />
export interface BuildingEnt {
    _id: string;
    name: string;
    nameJP?: string;
    company: string;
    companyJP?: string;
    companyUrl: string;
    images?: Array<{
        data: Buffer;
        contentType: string;
    }>;
    address: string;
    addressJP?: string;
    country: string;
    state: string;
    city: string;
    contractType: string;
    price: number;
    priceUnit: string;
}
