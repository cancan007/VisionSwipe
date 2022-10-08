/* eslint-disable prettier/prettier */
export class SaveData{
    season:number;
    prices:[[number]];
    rooms:[number];
}

export class ChangeData{
    _id:string;
    season?:number;
    prices?:[[number]];
    rooms?:[number];
}

export class FetchRoomData{
    year?:number;
    month?:number;
    day?:number;
}

export class SaveRoomData{
    year:number;
    month:number;
    day:number;
    rooms:number[];
}

export class ChangeRoomData{
    //_id?:string;
    year:number;
    month:number;
    day:number;
    rooms:number[];
}