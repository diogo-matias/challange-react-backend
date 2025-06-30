import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VendasModule } from './vendas.module';
import { VendasService } from './vendas.service';
import { VendasController } from './vendas.controller';
import { Venda } from './entities/venda.entity';
import { Cliente } from '../clientes/entities/cliente.entity';

describe('VendasModule', () => {
  let module: TestingModule;

  const mockVendaRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const mockClienteRepository = {
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [VendasModule],
    })
    .overrideProvider(getRepositoryToken(Venda))
    .useValue(mockVendaRepository)
    .overrideProvider(getRepositoryToken(Cliente))
    .useValue(mockClienteRepository)
    .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have VendasService', () => {
    const vendasService = module.get<VendasService>(VendasService);
    expect(vendasService).toBeDefined();
  });

  it('should have VendasController', () => {
    const vendasController = module.get<VendasController>(VendasController);
    expect(vendasController).toBeDefined();
  });
}); 