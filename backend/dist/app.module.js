"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const buildings_module_1 = require("./buildings/buildings.module");
const mongoose_1 = require("@nestjs/mongoose");
const stripe_module_1 = require("./stripe/stripe.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const kakurega_module_1 = require("./kakurega/kakurega.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../../frontend/build'),
            }),
            config_1.ConfigModule.forRoot({
                envFilePath: `./src/config/env/${process.env.NODE_ENV}.env`,
                load: [configuration_1.configuration],
                isGlobal: true
            }),
            mongoose_1.MongooseModule.forRoot(((0, configuration_1.configuration)().NODE_ENV ===
                'production') ? (0, configuration_1.configuration)().MONGODB_URI
                : 'mongodb://localhost:27017/visionswipe', { useNewUrlParser: true, useUnifiedTopology: true }),
            buildings_module_1.BuildingsModule, stripe_module_1.StripeModule, kakurega_module_1.KakuregaModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map