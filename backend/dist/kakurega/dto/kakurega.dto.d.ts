export declare class SaveData {
    season: number;
    prices: [[number]];
    rooms: [number];
}
export declare class ChangeData {
    _id: string;
    season?: number;
    prices?: [[number]];
    rooms?: [number];
}
export declare class FetchRoomData {
    year?: number;
    month?: number;
    day?: number;
}
export declare class SaveRoomData {
    year: number;
    month: number;
    day: number;
    rooms: number[];
}
export declare class ChangeRoomData {
    year: number;
    month: number;
    day: number;
    rooms: number[];
}
