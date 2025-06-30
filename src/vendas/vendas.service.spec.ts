import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VendasService } from './vendas.service';
import { Venda } from './entities/venda.entity';
import { Cliente } from '../clientes/entities/cliente.entity';

describe('VendasService', () => {
  let service: VendasService;
  let vendaRepository: Repository<Venda>;
  let clienteRepository: Repository<Cliente>;

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
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendasService,
        {
          provide: getRepositoryToken(Venda),
          useValue: mockVendaRepository,
        },
        {
          provide: getRepositoryToken(Cliente),
          useValue: mockClienteRepository,
        },
      ],
    }).compile();

    service = module.get<VendasService>(VendasService);
    vendaRepository = module.get<Repository<Venda>>(getRepositoryToken(Venda));
    clienteRepository = module.get<Repository<Cliente>>(getRepositoryToken(Cliente));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getVendasPorDia', () => {
    it('should return vendas grouped by day', async () => {
      const mockQueryBuilder = {
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue([
          { data: '2024-01-01', total: '500.00' },
          { data: '2024-01-02', total: '300.00' },
        ]),
      };

      mockVendaRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const result = await service.getVendasPorDia();

      expect(mockVendaRepository.createQueryBuilder).toHaveBeenCalledWith('venda');
      expect(mockQueryBuilder.select).toHaveBeenCalledWith('venda.data', 'data');
      expect(mockQueryBuilder.addSelect).toHaveBeenCalledWith('SUM(venda.valor)', 'total');
      expect(mockQueryBuilder.groupBy).toHaveBeenCalledWith('venda.data');
      expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('venda.data', 'DESC');
      expect(mockQueryBuilder.limit).toHaveBeenCalledWith(5);
      expect(result).toEqual([
        { data: '2024-01-01', total: '500.00' },
        { data: '2024-01-02', total: '300.00' },
      ]);
    });
  });

  describe('getVendasPorCliente', () => {
    it('should return vendas for a specific cliente', async () => {
      const clienteId = 1;
      const mockVendas = [
        { id: 1, clienteId: 1, valor: '100.50', data: new Date() },
        { id: 2, clienteId: 1, valor: '200.00', data: new Date() },
      ];

      mockVendaRepository.find.mockResolvedValue(mockVendas);

      const result = await service.getVendasPorCliente(clienteId);

      expect(mockVendaRepository.find).toHaveBeenCalledWith({
        where: { clienteId },
        order: { data: 'DESC' },
      });
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

      mockVendaRepository.create.mockReturnValue(expectedVenda);
      mockVendaRepository.save.mockResolvedValue(expectedVenda);

      const result = await service.create(createVendaDto);

      expect(mockVendaRepository.create).toHaveBeenCalledWith({
        ...createVendaDto,
        data: new Date(createVendaDto.data),
      });
      expect(mockVendaRepository.save).toHaveBeenCalledWith(expectedVenda);
      expect(result).toMatchObject({
        id: 1,
        clienteId: 1,
        valor: 100.50,
      });
      expect(result.data).toEqual(new Date(createVendaDto.data));
    });
  });

  describe('getEstatisticas', () => {
    it('should return statistics for clientes with vendas', async () => {
      const mockClientes = [
        {
          id: 1,
          nomeCompleto: 'João',
          vendas: [
            { valor: 100, data: new Date('2024-01-01') },
            { valor: 200, data: new Date('2024-01-01') },
            { valor: 150, data: new Date('2024-01-02') },
          ],
        },
        {
          id: 2,
          nomeCompleto: 'Maria',
          vendas: [
            { valor: 300, data: new Date('2024-01-01') },
          ],
        },
      ];

      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockClientes),
      };

      mockClienteRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const result = await service.getEstatisticas();

      expect(mockClienteRepository.createQueryBuilder).toHaveBeenCalledWith('cliente');
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledWith('cliente.vendas', 'vendas');
      expect(result).toHaveProperty('maiorVolume');
      expect(result).toHaveProperty('maiorMedia');
      expect(result).toHaveProperty('maiorFrequencia');
    });

    it('should handle clientes without vendas', async () => {
      const mockClientes = [
        {
          id: 1,
          nomeCompleto: 'João',
          vendas: [],
        },
      ];

      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockClientes),
      };

      mockClienteRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      const result = await service.getEstatisticas();

      expect(result.maiorVolume).toBeNull();
      expect(result.maiorMedia).toBeNull();
      expect(result.maiorFrequencia).toBeNull();
    });
  });
}); 