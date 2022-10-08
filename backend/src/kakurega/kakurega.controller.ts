/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { ChangeData, ChangeRoomData, SaveData } from './dto/kakurega.dto';
import { KakuregaEnt } from './entity/kakurega.entity';
import { KakuregaService } from './kakurega.service';

@Controller('api-kakurega')
export class KakuregaController {
    constructor(
        private kakuregaService: KakuregaService
        ){}

    @Get()
    async fetchData(@Res() res: Response)/*:Promise<KakuregaEnt>*/{
        const data = await this.kakuregaService.fetchData();
        res.json(data);
    }

    //http://localhost:3001/api-kakurega/room?year=2022&month=9&day=26
    @Get('room')
    async fetchRoomData(
        @Query('year') year:number,
        @Query('month') month:number,
        @Query('day') day:number,
        @Res() res:Response ){
        const params = {year, month, day};
        const datas = await this.kakuregaService.fetchRoomData(params);
        res.json(datas);
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

    @Post('room')
    async updateRoomData(@Body() body: ChangeRoomData, @Res() res:Response){
        const data = await this.kakuregaService.changeRoomData(body);
        return res.json(data);
    }
}
