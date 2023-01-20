import { Model } from 'mongoose';
import { KakuregaDocument, KakuregaRoomDataDocument } from './schemas/kakurega';
import { KakuregaEnt, KakuregaRoomDataEnt } from './entity/kakurega.entity';
import { SaveData, ChangeData, SaveRoomData, ChangeRoomData, FetchRoomData } from './dto/kakurega.dto';
export declare class KakuregaService {
    private kakuregaModel;
    private kakuregaRoomModel;
    constructor(kakuregaModel: Model<KakuregaDocument>, kakuregaRoomModel: Model<KakuregaRoomDataDocument>);
    fetchData(): Promise<KakuregaEnt>;
    saveData(dto: SaveData): Promise<KakuregaEnt>;
    changeData(dto: ChangeData): Promise<KakuregaEnt>;
    fetchRoomData(dto: FetchRoomData): Promise<Array<KakuregaRoomDataEnt>>;
    saveRoomData(dto: SaveRoomData): Promise<KakuregaRoomDataEnt>;
    changeRoomData(dto: ChangeRoomData): Promise<KakuregaRoomDataEnt>;
}
