import { Test, TestingModule } from '@nestjs/testing';
import { VendasModule } from './vendas.module';

describe('VendasModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [VendasModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should have VendasService', () => {
    const vendasService = module.get('VendasService');
    expect(vendasService).toBeDefined();
  });

  it('should have VendasController', () => {
    const vendasController = module.get('VendasController');
    expect(vendasController).toBeDefined();
  });
}); 