"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KakuregaService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let KakuregaService = class KakuregaService {
    constructor(kakuregaModel, kakuregaRoomModel) {
        this.kakuregaModel = kakuregaModel;
        this.kakuregaRoomModel = kakuregaRoomModel;
    }
    async fetchData() {
        const data = await this.kakuregaModel.findOne();
        return data;
    }
    async saveData(dto) {
        const savedData = new this.kakuregaModel(dto);
        return savedData.save();
    }
    async changeData(dto) {
        const data = await this.kakuregaModel.findOne();
        const { season: ds, prices: dp, rooms: dr } = dto;
        const { season, prices, rooms } = data;
        if (ds != season || dp != prices || dr != rooms) {
            data.season = ds;
            data.prices = dp;
            data.rooms = dr;
        }
        return data.save();
    }
    async fetchRoomData(dto) {
        if (dto.year && dto.month && dto.day) {
            const datas = await this.kakuregaRoomModel.find({
                $or: [
                    { year: { $gt: dto.year } },
                    { $and: [
                            { year: { $eq: dto.year } },
                            { $or: [
                                    { month: { $gt: dto.month } },
                                    { $and: [
                                            { month: { $eq: dto.month } },
                                            { day: { $gte: dto.day } }
                                        ] }
                                ] }
                        ] }
                ],
            });
            if (dto.endyear && dto.endmonth && dto.endday) {
                const query = datas.filter((e) => {
                    if (Number(e.year) < Number(dto.endyear)) {
                        return true;
                    }
                    else if ((Number(e.year) === Number(dto.endyear))
                        &&
                            (Number(e.month) < Number(dto.endmonth))) {
                        return true;
                    }
                    else if ((Number(e.year) === Number(dto.endyear))
                        && (Number(e.month) === Number(dto.endmonth)) && (Number(e.day) <= Number(dto.endday))) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
                return query;
            }
            return datas;
        }
        const datas = await this.kakuregaRoomModel.find();
        return datas;
    }
    async saveRoomData(dto) {
        const { year, month, day, rooms } = dto;
        const savedData = new this.kakuregaRoomModel({ year: Number(year), month: Number(month), day: Number(day), rooms });
        return savedData.save();
    }
    async changeRoomData(dto) {
        let data = await this.kakuregaRoomModel.findOne({ year: dto.year, month: dto.month, day: dto.day });
        if (!data) {
            const savedData = await this.saveRoomData(dto);
            return savedData;
        }
        const { rooms } = dto;
        data.rooms = rooms;
        return data.save();
    }
};
KakuregaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("kakurega")),
    __param(1, (0, mongoose_2.InjectModel)("kakurega-room")),
    __metadata("design:paramtypes", [mongoose_1.Model,
        mongoose_1.Model])
], KakuregaService);
exports.KakuregaService = KakuregaService;
//# sourceMappingURL=kakurega.service.js.map