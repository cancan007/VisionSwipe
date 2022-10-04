/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { AddBuilding, FetchBuildings } from './dto/building.dto';
import { BuildingEnt } from './entity/building.entity';

@Controller('api-buildings')
export class BuildingsController {
    constructor(private buildingsService: BuildingsService){}

    @Get()
    fetchBuildings(@Body() body: FetchBuildings): Promise<BuildingEnt[]>{
        return this.buildingsService.fetchBuildings(body);
    }

    @Post()
    addBuilding(@Body() body: AddBuilding): Promise<BuildingEnt>{
        return this.buildingsService.addBuilding(body)
    }
}
