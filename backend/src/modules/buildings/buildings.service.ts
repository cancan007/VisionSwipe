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
    constructor(@InjectModel("buildings") private buildingModel: Model<BuildingDocument>) {}

    async addBuilding(dto:AddBuilding): Promise<BuildingEnt>{
       const addedBuilding = new this.buildingModel(dto);
       return addedBuilding.save();
       
    }

    async fetchBuildings(dto:FetchBuildings):Promise<Array<BuildingEnt>>{
        const buildings = this.buildingModel.find().exec();
        return buildings;
    }
}
