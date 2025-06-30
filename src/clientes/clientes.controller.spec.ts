import { Test, TestingModule } from '@nestjs/testing';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

describe('ClientesController', () => {
  let controller: ClientesController;
  let service: ClientesService;

  const mockClientesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesController],
      providers: [
        {
          provide: ClientesService,
          useValue: mockClientesService,
        },
      ],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
    service = module.get<ClientesService>(ClientesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new cliente', async () => {
      const createClienteDto: CreateClienteDto = {
        nomeCompleto: 'João Silva',
        email: 'joao@example.com',
        dataNascimento: '1990-01-01',
      };

      const expectedCliente = {
        id: 1,
        ...createClienteDto,
        dataNascimento: new Date(createClienteDto.dataNascimento),
      };

      mockClientesService.create.mockResolvedValue(expectedCliente);

      const result = await controller.create(createClienteDto);

      expect(service.create).toHaveBeenCalledWith(createClienteDto);
      expect(result).toEqual(expectedCliente);
    });
  });

  describe('findAll', () => {
    it('should return all clientes without filter', async () => {
      const expectedClientes = [
        { id: 1, nomeCompleto: 'João', email: 'joao@example.com', dataNascimento: new Date() },
      ];

      mockClientesService.findAll.mockResolvedValue(expectedClientes);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalledWith(undefined);
      expect(result).toEqual(expectedClientes);
    });

    it('should return filtered clientes', async () => {
      const filtro = 'João';
      const expectedClientes = [
        { id: 1, nomeCompleto: 'João Silva', email: 'joao@example.com', dataNascimento: new Date() },
      ];

      mockClientesService.findAll.mockResolvedValue(expectedClientes);

      const result = await controller.findAll(filtro);

      expect(service.findAll).toHaveBeenCalledWith(filtro);
      expect(result).toEqual(expectedClientes);
    });
  });

  describe('findOne', () => {
    it('should return a cliente by id', async () => {
      const id = '1';
      const expectedCliente = {
        id: 1,
        nomeCompleto: 'João Silva',
        email: 'joao@example.com',
        dataNascimento: new Date(),
      };

      mockClientesService.findOne.mockResolvedValue(expectedCliente);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedCliente);
    });
  });

  describe('update', () => {
    it('should update a cliente', async () => {
      const id = '1';
      const updateClienteDto: UpdateClienteDto = {
        nomeCompleto: 'João Silva Atualizado',
      };

      const updatedCliente = {
        id: 1,
        nomeCompleto: 'João Silva Atualizado',
        email: 'joao@example.com',
        dataNascimento: new Date(),
      };

      mockClientesService.update.mockResolvedValue(updatedCliente);

      const result = await controller.update(id, updateClienteDto);

      expect(service.update).toHaveBeenCalledWith(1, updateClienteDto);
      expect(result).toEqual(updatedCliente);
    });
  });

  describe('remove', () => {
    it('should remove a cliente', async () => {
      const id = '1';

      mockClientesService.remove.mockResolvedValue(undefined);

      await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('removeTest', () => {
    it('should remove a cliente without auth guard', async () => {
      const id = '1';

      mockClientesService.remove.mockResolvedValue(undefined);

      await controller.removeTest(id);

      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
}); 