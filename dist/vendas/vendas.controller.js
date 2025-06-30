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
exports.VendasController = void 0;
const common_1 = require("@nestjs/common");
const vendas_service_1 = require("./vendas.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let VendasController = class VendasController {
    constructor(vendasService) {
        this.vendasService = vendasService;
    }
    create(createVendaDto) {
        return this.vendasService.create(createVendaDto);
    }
    getVendasPorDia() {
        return this.vendasService.getVendasPorDia();
    }
    getEstatisticas() {
        return this.vendasService.getEstatisticas();
    }
    getVendasPorCliente(clienteId) {
        return this.vendasService.getVendasPorCliente(+clienteId);
    }
};
exports.VendasController = VendasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VendasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('por-dia'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VendasController.prototype, "getVendasPorDia", null);
__decorate([
    (0, common_1.Get)('estatisticas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VendasController.prototype, "getEstatisticas", null);
__decorate([
    (0, common_1.Get)('cliente/:clienteId'),
    __param(0, (0, common_1.Param)('clienteId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VendasController.prototype, "getVendasPorCliente", null);
exports.VendasController = VendasController = __decorate([
    (0, common_1.Controller)('vendas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [vendas_service_1.VendasService])
], VendasController);
//# sourceMappingURL=vendas.controller.js.map