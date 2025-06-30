import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepository.create(createClienteDto);
    const savedCliente = await this.clienteRepository.save(cliente);
    return savedCliente;
  }

  async findAll(filtro?: string): Promise<Cliente[]> {
    let clientes;
    if (filtro) {
      clientes = await this.clienteRepository.find({
        where: [
          { nomeCompleto: Like(`%${filtro}%`) },
          { email: Like(`%${filtro}%`) },
        ],
        relations: ['vendas'],
      });
    } else {
      clientes = await this.clienteRepository.find({ relations: ['vendas'] });
    }
    return clientes;
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['vendas'],
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return cliente;
  }

  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    const cliente = await this.findOne(id);
    Object.assign(cliente, updateClienteDto);
    return this.clienteRepository.save(cliente);
  }

  async remove(id: number): Promise<void> {
    const cliente = await this.findOne(id);
    
    if (cliente.vendas && cliente.vendas.length > 0) {
      await this.clienteRepository
        .createQueryBuilder()
        .delete()
        .from('venda')
        .where('clienteId = :id', { id })
        .execute();
    }
    
    await this.clienteRepository.remove(cliente);
  }
} 