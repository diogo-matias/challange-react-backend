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
    console.log('Criando cliente:', createClienteDto);
    const cliente = this.clienteRepository.create(createClienteDto);
    const savedCliente = await this.clienteRepository.save(cliente);
    console.log('Cliente criado:', savedCliente);
    return savedCliente;
  }

  async findAll(filtro?: string): Promise<Cliente[]> {
    console.log('Buscando clientes, filtro:', filtro);
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
    console.log('Clientes encontrados:', clientes.length);
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
    console.log('Tentando remover cliente com ID:', id);
    const cliente = await this.findOne(id);
    
    if (cliente.vendas && cliente.vendas.length > 0) {
      console.log('Cliente tem vendas associadas:', cliente.vendas.length);
      // Primeiro remove as vendas associadas
      await this.clienteRepository
        .createQueryBuilder()
        .delete()
        .from('venda')
        .where('clienteId = :id', { id })
        .execute();
      console.log('Vendas removidas');
    }
    
    await this.clienteRepository.remove(cliente);
    console.log('Cliente removido com sucesso');
  }
} 