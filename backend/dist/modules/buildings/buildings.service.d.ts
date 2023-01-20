import { Model } from 'mongoose';
import { BuildingDocument } from './schemas/building';
import { BuildingEnt } from './entity/building.entity';
import { AddBuilding, FetchBuildings } from './dto/building.dto';
export declare class BuildingsService {
    private buildingModel;
    constructor(buildingModel: Model<BuildingDocument>);
    addBuilding(dto: AddBuilding): Promise<BuildingEnt>;
    fetchBuildings(dto: FetchBuildings): Promise<Array<BuildingEnt>>;
}
