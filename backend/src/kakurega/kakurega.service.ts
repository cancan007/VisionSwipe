/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { KakuregaDocument } from './schemas/kakurega';
import { KakuregaEnt } from './entity/kakurega.entity';
import { SaveData, ChangeData} from './dto/kakurega.dto';

@Injectable()
export class KakuregaService {
    constructor(@InjectModel("kakurega") private kakuregaModel: Model<KakuregaDocument>) {}

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
}
