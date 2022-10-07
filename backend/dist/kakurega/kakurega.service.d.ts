import { Model } from 'mongoose';
import { KakuregaDocument } from './schemas/kakurega';
import { KakuregaEnt } from './entity/kakurega.entity';
import { SaveData, ChangeData } from './dto/kakurega.dto';
export declare class KakuregaService {
    private kakuregaModel;
    constructor(kakuregaModel: Model<KakuregaDocument>);
    fetchData(): Promise<KakuregaEnt>;
    saveData(dto: SaveData): Promise<KakuregaEnt>;
    changeData(dto: ChangeData): Promise<KakuregaEnt>;
}
