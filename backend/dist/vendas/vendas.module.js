"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const vendas_controller_1 = require("./vendas.controller");
const vendas_service_1 = require("./vendas.service");
const venda_entity_1 = require("./entities/venda.entity");
const cliente_entity_1 = require("../clientes/entities/cliente.entity");
let VendasModule = class VendasModule {
};
exports.VendasModule = VendasModule;
exports.VendasModule = VendasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([venda_entity_1.Venda, cliente_entity_1.Cliente])],
        controllers: [vendas_controller_1.VendasController],
        providers: [vendas_service_1.VendasService],
        exports: [vendas_service_1.VendasService],
    })
], VendasModule);
//# sourceMappingURL=vendas.module.js.map