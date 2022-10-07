import { Response } from 'express';
import { ChangeData } from './dto/kakurega.dto';
import { KakuregaEnt } from './entity/kakurega.entity';
import { KakuregaService } from './kakurega.service';
export declare class KakuregaController {
    private kakuregaService;
    constructor(kakuregaService: KakuregaService);
    fetchData(res: Response): Promise<void>;
    updateData(body: ChangeData): Promise<KakuregaEnt>;
}
