import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClientesModule } from './clientes.module';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { Cliente } from './entities/cliente.entity';

describe('ClientesModule', () => {
  let module: TestingModule;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ClientesModule],
    })
    .overrideProvider(getRepositoryToken(Cliente))
    .useValue(mockRepository)
    .compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have ClientesService', () => {
    const clientesService = module.get<ClientesService>(ClientesService);
    expect(clientesService).toBeDefined();
  });

  it('should have ClientesController', () => {
    const clientesController = module.get<ClientesController>(ClientesController);
    expect(clientesController).toBeDefined();
  });
}); 