"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const cliente_entity_1 = require("../clientes/entities/cliente.entity");
const venda_entity_1 = require("../vendas/entities/venda.entity");
exports.databaseConfig = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [cliente_entity_1.Cliente, venda_entity_1.Venda],
    synchronize: true,
    ssl: {
        rejectUnauthorized: false,
    },
};
//# sourceMappingURL=database.config.js.map