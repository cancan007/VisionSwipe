import { BuildingsService } from './buildings.service';
import { AddBuilding, FetchBuildings } from './dto/building.dto';
import { BuildingEnt } from './entity/building.entity';
export declare class BuildingsController {
    private buildingsService;
    constructor(buildingsService: BuildingsService);
    fetchBuildings(body: FetchBuildings): Promise<BuildingEnt[]>;
    addBuilding(body: AddBuilding): Promise<BuildingEnt>;
}
