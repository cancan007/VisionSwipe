"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const configuration_1 = require("./config/configuration");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    if ((0, configuration_1.configuration)().NODE_ENV === "development") {
        app.enableCors({
            origin: ["http://localhost:3000"],
            allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
        });
    }
    else if ((0, configuration_1.configuration)().NODE_ENV === "production") {
        app.enableCors();
    }
    app.useStaticAssets((0, path_1.join)(__dirname, '../frontend/build'));
    await app.listen(process.env.PORT || 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map