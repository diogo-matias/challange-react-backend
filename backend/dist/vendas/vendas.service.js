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
exports.VendasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const venda_entity_1 = require("./entities/venda.entity");
const cliente_entity_1 = require("../clientes/entities/cliente.entity");
let VendasService = class VendasService {
    constructor(vendaRepository, clienteRepository) {
        this.vendaRepository = vendaRepository;
        this.clienteRepository = clienteRepository;
    }
    async getVendasPorDia() {
        return this.vendaRepository
            .createQueryBuilder('venda')
            .select('venda.data', 'data')
            .addSelect('SUM(venda.valor)', 'total')
            .groupBy('venda.data')
            .orderBy('venda.data', 'DESC')
            .limit(5)
            .getRawMany();
    }
    async getVendasPorCliente(clienteId) {
        const vendas = await this.vendaRepository.find({
            where: { clienteId },
            order: { data: 'DESC' },
        });
        return vendas.map(venda => ({
            ...venda,
            valor: Number(venda.valor),
        }));
    }
    async create(createVendaDto) {
        const venda = this.vendaRepository.create({
            ...createVendaDto,
            data: new Date(createVendaDto.data),
        });
        return this.vendaRepository.save(venda);
    }
    async getEstatisticas() {
        const clientes = await this.clienteRepository
            .createQueryBuilder('cliente')
            .leftJoinAndSelect('cliente.vendas', 'vendas')
            .getMany();
        let maiorVolume = null;
        let maiorMedia = null;
        let maiorFrequencia = null;
        for (const cliente of clientes) {
            if (cliente.vendas.length === 0)
                continue;
            const totalVendas = cliente.vendas.reduce((sum, venda) => sum + Number(venda.valor), 0);
            const numeroVendas = cliente.vendas.length;
            const mediaVendas = totalVendas / cliente.vendas.length;
            const diasUnicos = new Set(cliente.vendas.map(v => {
                let data;
                if (v.data instanceof Date) {
                    data = v.data;
                }
                else if (typeof v.data === 'string') {
                    data = new Date(v.data);
                }
                else {
                    data = new Date();
                }
                if (isNaN(data.getTime())) {
                    return new Date().toISOString().split('T')[0];
                }
                return data.toISOString().split('T')[0];
            })).size;
            if (!maiorVolume || numeroVendas > maiorVolume.total) {
                maiorVolume = {
                    cliente: cliente.nomeCompleto,
                    total: numeroVendas,
                };
            }
            if (!maiorMedia || mediaVendas > maiorMedia.media) {
                maiorMedia = {
                    cliente: cliente.nomeCompleto,
                    media: mediaVendas,
                };
            }
            if (!maiorFrequencia || diasUnicos > maiorFrequencia.dias) {
                maiorFrequencia = {
                    cliente: cliente.nomeCompleto,
                    dias: diasUnicos,
                };
            }
        }
        return {
            maiorVolume,
            maiorMedia,
            maiorFrequencia,
        };
    }
};
exports.VendasService = VendasService;
exports.VendasService = VendasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(venda_entity_1.Venda)),
    __param(1, (0, typeorm_1.InjectRepository)(cliente_entity_1.Cliente)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], VendasService);
//# sourceMappingURL=vendas.service.js.map