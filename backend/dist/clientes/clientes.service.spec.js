"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const typeorm_1 = require("@nestjs/typeorm");
const clientes_service_1 = require("./clientes.service");
const cliente_entity_1 = require("./entities/cliente.entity");
const common_1 = require("@nestjs/common");
describe('ClientesService', () => {
    let service;
    let repository;
    const mockRepository = {
        create: jest.fn(),
        save: jest.fn(),
        find: jest.fn(),
        findOne: jest.fn(),
        remove: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                clientes_service_1.ClientesService,
                {
                    provide: (0, typeorm_1.getRepositoryToken)(cliente_entity_1.Cliente),
                    useValue: mockRepository,
                },
            ],
        }).compile();
        service = module.get(clientes_service_1.ClientesService);
        repository = module.get((0, typeorm_1.getRepositoryToken)(cliente_entity_1.Cliente));
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should create a new cliente', async () => {
            const createClienteDto = {
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
            await expect(service.findOne(id)).rejects.toThrow(common_1.NotFoundException);
        });
    });
    describe('update', () => {
        it('should update a cliente', async () => {
            const id = 1;
            const updateClienteDto = {
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
//# sourceMappingURL=clientes.service.spec.js.map