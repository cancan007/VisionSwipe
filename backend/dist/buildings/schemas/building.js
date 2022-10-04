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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingSchema = exports.Building = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const imageSchema = new mongoose_1.default.Schema({ data: Buffer, contentType: String });
let Building = class Building {
};
__decorate([
    (0, mongoose_2.Prop)({
        type: String,
        required: true,
        min: 2
    }),
    __metadata("design:type", String)
], Building.prototype, "name", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Building.prototype, "nameJP", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        type: String,
        required: true,
        min: 2
    }),
    __metadata("design:type", String)
], Building.prototype, "company", void 0);
__decorate([
    (0, mongoose_2.Prop)(),
    __metadata("design:type", String)
], Building.prototype, "companyJP", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        type: String,
        required: true,
        min: 5,
    }),
    __metadata("design:type", String)
], Building.prototype, "companyUrl", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        type: [{
                data: Buffer,
                contentType: String
            }]
    }),
    __metadata("design:type", Array)
], Building.prototype, "images", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        type: String,
        required: true,
        min: 5,
    }),
    __metadata("design:type", String)
], Building.prototype, "address", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        type: String,
        min: 5
    }),
    __metadata("design:type", String)
], Building.prototype, "addressJP", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        type: String,
        required: true
    }),
    __metadata("design:type", String)
], Building.prototype, "country", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        type: String,
        required: true
    }),
    __metadata("design:type", String)
], Building.prototype, "state", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        type: String,
        required: true
    }),
    __metadata("design:type", String)
], Building.prototype, "city", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        type: String,
        required: true
    }),
    __metadata("design:type", String)
], Building.prototype, "contractType", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        type: Number,
        required: true,
        min: 0
    }),
    __metadata("design:type", Number)
], Building.prototype, "price", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        type: String,
        required: true,
        min: 1
    }),
    __metadata("design:type", String)
], Building.prototype, "priceUnit", void 0);
Building = __decorate([
    (0, mongoose_2.Schema)({ collection: 'buildings' })
], Building);
exports.Building = Building;
exports.BuildingSchema = mongoose_2.SchemaFactory.createForClass(Building);
//# sourceMappingURL=building.js.map