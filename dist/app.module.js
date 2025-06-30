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
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const app_controller_1 = require("./app.controller");
const auth_module_1 = require("./auth/auth.module");
const clientes_module_1 = require("./clientes/clientes.module");
const vendas_module_1 = require("./vendas/vendas.module");
const cliente_entity_1 = require("./clientes/entities/cliente.entity");
const venda_entity_1 = require("./vendas/entities/venda.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                entities: [cliente_entity_1.Cliente, venda_entity_1.Venda],
                synchronize: true,
                ssl: {
                    rejectUnauthorized: false,
                },
            }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'loja_brinquedos_secret_key_2024',
                signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '24h' },
            }),
            passport_1.PassportModule,
            auth_module_1.AuthModule,
            clientes_module_1.ClientesModule,
            vendas_module_1.VendasModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map