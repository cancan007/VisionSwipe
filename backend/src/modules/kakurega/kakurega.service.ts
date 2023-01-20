/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { KakuregaDocument, KakuregaRoomDataDocument } from './schemas/kakurega';
import { KakuregaEnt, KakuregaRoomDataEnt } from './entity/kakurega.entity';
import { SaveData, ChangeData, SaveRoomData, ChangeRoomData, FetchRoomData} from './dto/kakurega.dto';

@Injectable()
export class KakuregaService {
    constructor(
        @InjectModel("kakurega") private kakuregaModel: Model<KakuregaDocument>,
        @InjectModel("kakurega-room") private kakuregaRoomModel: Model<KakuregaRoomDataDocument>
        ) {}

    async fetchData():Promise<KakuregaEnt>{
        const data = await this.kakuregaModel.findOne();
        return data;
    }

    async saveData(dto:SaveData): Promise<KakuregaEnt>{
        const savedData = new this.kakuregaModel(dto);
        return savedData.save();
        
     }
 
     async changeData(dto:ChangeData):Promise<KakuregaEnt>{
         const data = await this.kakuregaModel.findOne();
         const {season:ds,prices:dp, rooms:dr} = dto;
         const {season,prices, rooms} = data;
         if( ds!=season || dp != prices || dr != rooms){
            data.season = ds;
            data.prices = dp;
            data.rooms = dr;
         }
         return data.save();
     }

     async fetchRoomData(dto:FetchRoomData):Promise<Array<KakuregaRoomDataEnt>>{
        if(dto.year && dto.month && dto.day){
            const datas = await this.kakuregaRoomModel.find({
                $or:[
                    {year:{$gt:dto.year}},
                    {$and:[
                        {year:{$eq:dto.year}},
                        {$or:[
                            {month:{$gt:dto.month}},
                            {$and:[
                                {month:{$eq:dto.month}},
                                {day:{$gte:dto.day}}
                            ]}
                        ]}
                        
                    ]}
                    
                ],

            })
            if(dto.endyear && dto.endmonth && dto.endday){
                /*
                const query = datas.find({
                    $or:[
                        {year:{$lt:dto.endyear}},
                        {$and:[
                            {year:{$eq:dto.endyear}},
                            {$or:[
                                {month:{$lt:dto.endmonth}},
                                {$and:[
                                    {month:{$eq:endmonth}},
                                    {day:{$lte:endday}}
                                ]}
                            ]}
                        ]}
                    ]
                })*/
                const query = datas.filter((e:KakuregaRoomDataEnt) => {
                    if(Number(e.year) < Number(dto.endyear)){
                        return true
                    }else if(
                        (Number(e.year) === Number(dto.endyear)) 
                        && 
                        (Number(e.month) < Number(dto.endmonth))){
                            return true
                    } else if(
                        (Number(e.year) === Number(dto.endyear))
                            && (Number(e.month) === Number(dto.endmonth)) && (Number(e.day) <= Number(dto.endday))){
                                return true
                    }else{
                        return false
                    }

                    
                })
                return query;
            }
            return datas;
        }
        const datas = await this.kakuregaRoomModel.find();
        return datas;
     }

     async saveRoomData(dto:SaveRoomData):Promise<KakuregaRoomDataEnt>{
        const {year, month, day, rooms} = dto;
        const savedData = new this.kakuregaRoomModel({year:Number(year), month:Number(month), day:Number(day), rooms});
        return savedData.save();
     }

     async changeRoomData(dto:ChangeRoomData):Promise<KakuregaRoomDataEnt>{
        let data = await this.kakuregaRoomModel.findOne({year:dto.year, month:dto.month, day:dto.day})
        if(!data){ 
            const savedData = await this.saveRoomData(dto);
            return savedData;
        }
        const {rooms} = dto;
        data.rooms = rooms;
        return data.save();
     }
}
