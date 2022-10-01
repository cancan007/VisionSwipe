/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BuildingDocument, Building } from './schemas/building';
import { BuildingEnt } from './entity/building.entity';
import { AddBuilding, FetchBuildings } from './dto/building.dto';

@Injectable()
export class BuildingsService {
    constructor(@InjectModel(Building.name) private buildingModel: Model<BuildingDocument>) {}

    async addBuilding(dto:AddBuilding): Promise<BuildingEnt>{
       const addedBuilding = new this.buildingModel(dto);
       return addedBuilding;
    }

    async fetchBuildings(dto:FetchBuildings):Promise<Array<BuildingEnt>>{
        return this.buildingModel.find();
    }
}
