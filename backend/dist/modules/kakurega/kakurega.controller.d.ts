import { Response } from 'express';
import { ChangeData, ChangeRoomData } from './dto/kakurega.dto';
import { KakuregaEnt } from './entity/kakurega.entity';
import { KakuregaService } from './kakurega.service';
export declare class KakuregaController {
    private kakuregaService;
    constructor(kakuregaService: KakuregaService);
    fetchData(res: Response): Promise<void>;
    fetchRoomData(year: number, month: number, day: number, res: Response): Promise<void>;
    fetchRoomStartEnd(year: number, month: number, day: number, endyear: number, endmonth: number, endday: number, res: Response): Promise<void>;
    updateData(body: ChangeData): Promise<KakuregaEnt>;
    updateRoomData(body: ChangeRoomData, res: Response): Promise<Response<any, Record<string, any>>>;
}
