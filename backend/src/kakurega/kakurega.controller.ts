/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChangeData, SaveData } from './dto/kakurega.dto';
import { KakuregaEnt } from './entity/kakurega.entity';
import { KakuregaService } from './kakurega.service';

@Controller('api-kakurega')
export class KakuregaController {
    constructor(private kakuregaService: KakuregaService){}

    @Get()
    async fetchData():Promise<KakuregaEnt>{
        return await this.kakuregaService.fetchData();
    }

    @Post()
    async updateData(@Body() body: ChangeData): Promise<KakuregaEnt>{
        const data = await this.kakuregaService.fetchData();
        
        if(data) return this.kakuregaService.changeData(body);
        else if(body.season && body.prices && body.rooms){
            const {season, prices, rooms} = body;
            return this.kakuregaService.saveData({season, prices, rooms});
        } 
    }
}
