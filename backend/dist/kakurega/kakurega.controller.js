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
exports.KakuregaController = void 0;
const common_1 = require("@nestjs/common");
const kakurega_dto_1 = require("./dto/kakurega.dto");
const kakurega_service_1 = require("./kakurega.service");
let KakuregaController = class KakuregaController {
    constructor(kakuregaService) {
        this.kakuregaService = kakuregaService;
    }
    async fetchData(res) {
        const data = await this.kakuregaService.fetchData();
        res.json(data);
    }
    async updateData(body) {
        const data = await this.kakuregaService.fetchData();
        if (data) {
            return this.kakuregaService.changeData(body);
        }
        else {
            const { season, prices, rooms } = body;
            return this.kakuregaService.saveData({ season, prices, rooms });
        }
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KakuregaController.prototype, "fetchData", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kakurega_dto_1.ChangeData]),
    __metadata("design:returntype", Promise)
], KakuregaController.prototype, "updateData", null);
KakuregaController = __decorate([
    (0, common_1.Controller)('api-kakurega'),
    __metadata("design:paramtypes", [kakurega_service_1.KakuregaService])
], KakuregaController);
exports.KakuregaController = KakuregaController;
//# sourceMappingURL=kakurega.controller.js.map