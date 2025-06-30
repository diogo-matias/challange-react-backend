import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { NotFoundException } from '@nestjs/common';

describe('ClientesService', () => {
  let service: ClientesService;
  let repository: Repository<Cliente>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientesService,
        {
          provide: getRepositoryToken(Cliente),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClientesService>(ClientesService);
    repository = module.get<Repository<Cliente>>(getRepositoryToken(Cliente));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      mockRepository.create.mockReturnValue(expectedCliente);
      mockRepository.save.mockResolvedValue(expectedCliente);

      const result = await service.create(createClienteDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createClienteDto);
      expect(mockRepository.save).toHaveBeenCalledWith(expectedCliente);
      expect(result).toEqual(expectedCliente);
    });
  });

  describe('findAll', () => {
    it('should return all clientes without filter', async () => {
      const expectedClientes = [
        { id: 1, nomeCompleto: 'João', email: 'joao@example.com', dataNascimento: new Date() },
      ];

      mockRepository.find.mockResolvedValue(expectedClientes);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({ relations: ['vendas'] });
      expect(result).toEqual(expectedClientes);
    });

    it('should return filtered clientes', async () => {
      const filtro = 'João';
      const expectedClientes = [
        { id: 1, nomeCompleto: 'João Silva', email: 'joao@example.com', dataNascimento: new Date() },
      ];

      mockRepository.find.mockResolvedValue(expectedClientes);

      const result = await service.findAll(filtro);

      expect(mockRepository.find).toHaveBeenCalledWith({
        where: [
          { nomeCompleto: expect.any(Object) },
          { email: expect.any(Object) },
        ],
        relations: ['vendas'],
      });
      expect(result).toEqual(expectedClientes);
    });
  });

  describe('findOne', () => {
    it('should return a cliente by id', async () => {
      const id = 1;
      const expectedCliente = {
        id,
        nomeCompleto: 'João Silva',
        email: 'joao@example.com',
        dataNascimento: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(expectedCliente);

      const result = await service.findOne(id);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['vendas'],
      });
      expect(result).toEqual(expectedCliente);
    });

    it('should throw NotFoundException when cliente not found', async () => {
      const id = 999;

      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a cliente', async () => {
      const id = 1;
      const updateClienteDto: UpdateClienteDto = {
        nomeCompleto: 'João Silva Atualizado',
      };

      const existingCliente = {
        id,
        nomeCompleto: 'João Silva',
        email: 'joao@example.com',
        dataNascimento: new Date(),
      };

      const updatedCliente = {
        ...existingCliente,
        ...updateClienteDto,
      };

      mockRepository.findOne.mockResolvedValue(existingCliente);
      mockRepository.save.mockResolvedValue(updatedCliente);

      const result = await service.update(id, updateClienteDto);

      expect(mockRepository.save).toHaveBeenCalledWith(updatedCliente);
      expect(result).toEqual(updatedCliente);
    });
  });

  describe('remove', () => {
    it('should remove a cliente', async () => {
      const id = 1;
      const cliente = {
        id,
        nomeCompleto: 'João Silva',
        email: 'joao@example.com',
        dataNascimento: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(cliente);
      mockRepository.remove.mockResolvedValue(cliente);

      await service.remove(id);

      expect(mockRepository.remove).toHaveBeenCalledWith(cliente);
    });
  });
}); 