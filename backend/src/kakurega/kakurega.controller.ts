/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChangeData, SaveData } from './dto/kakurega.dto';
import { KakuregaEnt } from './entity/kakurega.entity';
import { KakuregaService } from './kakurega.service';

@Controller('api-kakurega')
export class KakuregaController {
    constructor(private kakuregaService: KakuregaService){}

    @Get()
    async fetchData(@Res() res: Response)/*:Promise<KakuregaEnt>*/{
        const data = await this.kakuregaService.fetchData();
        res.json(data);
    }

    @Post()
    async updateData(@Body() body: ChangeData): Promise<KakuregaEnt>{
        const data = await this.kakuregaService.fetchData();
        
        if(data) {
            return this.kakuregaService.changeData(body)
        }
        else {
            const {season, prices, rooms} = body;
            return this.kakuregaService.saveData({season, prices, rooms});
        } 
    }
}
