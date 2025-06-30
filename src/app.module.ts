import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { VendasModule } from './vendas/vendas.module';
import { Cliente } from './clientes/entities/cliente.entity';
import { Venda } from './vendas/entities/venda.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Cliente, Venda],
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'loja_brinquedos_secret_key_2024',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '24h' },
    }),
    PassportModule,
    AuthModule,
    ClientesModule,
    VendasModule,
  ],
  controllers: [AppController],
})
export class AppModule {} 