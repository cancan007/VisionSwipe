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