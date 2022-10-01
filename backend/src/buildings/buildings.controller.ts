/* eslint-disable prettier/prettier */
import { Body, Controller, Get } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { FetchBuildings } from './dto/building.dto';
import { BuildingEnt } from './entity/building.entity';

@Controller('buildings')
export class BuildingsController {
    constructor(private buildingsService: BuildingsService){}

    @Get()
    fetchBuildings(@Body() body: FetchBuildings): Promise<BuildingEnt[]>{
        return this.buildingsService.fetchBuildings(body);
    }
}
