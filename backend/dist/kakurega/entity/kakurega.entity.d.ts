export interface KakuregaEnt {
    _id?: string;
    season?: number;
    prices?: [[number]];
    rooms?: [number];
}
export interface KakuregaRoomDataEnt {
    _id: string;
    year: number;
    month: number;
    day: number;
}
