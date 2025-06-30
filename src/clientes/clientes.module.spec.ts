import { Test, TestingModule } from '@nestjs/testing';
import { ClientesModule } from './clientes.module';

describe('ClientesModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ClientesModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have ClientesService', () => {
    const clientesService = module.get('ClientesService');
    expect(clientesService).toBeDefined();
  });

  it('should have ClientesController', () => {
    const clientesController = module.get('ClientesController');
    expect(clientesController).toBeDefined();
  });
}); 