import { ChangeData } from './dto/kakurega.dto';
import { KakuregaEnt } from './entity/kakurega.entity';
import { KakuregaService } from './kakurega.service';
export declare class KakuregaController {
    private kakuregaService;
    constructor(kakuregaService: KakuregaService);
    fetchData(): Promise<KakuregaEnt>;
    updateData(body: ChangeData): Promise<KakuregaEnt>;
}
