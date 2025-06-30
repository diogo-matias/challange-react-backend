import { Test, TestingModule } from '@nestjs/testing';
import { VendasController } from './vendas.controller';
import { VendasService } from './vendas.service';

describe('VendasController', () => {
  let controller: VendasController;
  let service: VendasService;

  const mockVendasService = {
    create: jest.fn(),
    getVendasPorDia: jest.fn(),
    getEstatisticas: jest.fn(),
    getVendasPorCliente: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendasController],
      providers: [
        {
          provide: VendasService,
          useValue: mockVendasService,
        },
      ],
    }).compile();

    controller = module.get<VendasController>(VendasController);
    service = module.get<VendasService>(VendasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new venda', async () => {
      const createVendaDto = {
        clienteId: 1,
        valor: 100.50,
        data: '2024-01-01',
      };

      const expectedVenda = {
        id: 1,
        ...createVendaDto,
        data: new Date(createVendaDto.data),
      };

      mockVendasService.create.mockResolvedValue(expectedVenda);

      const result = await controller.create(createVendaDto);

      expect(service.create).toHaveBeenCalledWith(createVendaDto);
      expect(result).toMatchObject({
        id: 1,
        clienteId: 1,
        valor: 100.50,
      });
      expect(result.data).toEqual(new Date(createVendaDto.data));
    });
  });

  describe('getVendasPorDia', () => {
    it('should return vendas grouped by day', async () => {
      const expectedVendas = [
        { data: '2024-01-01', total: '500.00' },
        { data: '2024-01-02', total: '300.00' },
      ];

      mockVendasService.getVendasPorDia.mockResolvedValue(expectedVendas);

      const result = await controller.getVendasPorDia();

      expect(service.getVendasPorDia).toHaveBeenCalled();
      expect(result).toEqual(expectedVendas);
    });
  });

  describe('getEstatisticas', () => {
    it('should return statistics', async () => {
      const expectedStats = {
        maiorVolume: { cliente: 'João', total: 5 },
        maiorMedia: { cliente: 'Maria', media: 150.50 },
        maiorFrequencia: { cliente: 'Pedro', dias: 3 },
      };

      mockVendasService.getEstatisticas.mockResolvedValue(expectedStats);

      const result = await controller.getEstatisticas();

      expect(service.getEstatisticas).toHaveBeenCalled();
      expect(result).toEqual(expectedStats);
    });
  });

  describe('getVendasPorCliente', () => {
    it('should return vendas for a specific cliente', async () => {
      const clienteId = '1';
      const expectedVendas = [
        { id: 1, clienteId: 1, valor: 100.50, data: new Date() },
        { id: 2, clienteId: 1, valor: 200.00, data: new Date() },
      ];

      mockVendasService.getVendasPorCliente.mockResolvedValue(expectedVendas);

      const result = await controller.getVendasPorCliente(clienteId);

      expect(service.getVendasPorCliente).toHaveBeenCalledWith(1);
      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        id: 1,
        clienteId: 1,
        valor: 100.50,
      });
      expect(result[1]).toMatchObject({
        id: 2,
        clienteId: 1,
        valor: 200.00,
      });
    });
  });
}); 