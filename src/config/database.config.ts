import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cliente } from '../clientes/entities/cliente.entity';
import { Venda } from '../vendas/entities/venda.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [Cliente, Venda],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
}; 