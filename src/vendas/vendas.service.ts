import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venda } from './entities/venda.entity';
import { Cliente } from '../clientes/entities/cliente.entity';

interface CreateVendaDto {
  clienteId: number;
  valor: number;
  data: string;
}

@Injectable()
export class VendasService {
  constructor(
    @InjectRepository(Venda)
    private vendaRepository: Repository<Venda>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  async getVendasPorDia() {
    return this.vendaRepository
      .createQueryBuilder('venda')
      .select('venda.data', 'data')
      .addSelect('SUM(venda.valor)', 'total')
      .groupBy('venda.data')
      .orderBy('venda.data', 'DESC')
      .limit(5)
      .getRawMany();
  }

  async getVendasPorCliente(clienteId: number) {
    const vendas = await this.vendaRepository.find({
      where: { clienteId },
      order: { data: 'DESC' },
    });
    
    // Ensure valor is returned as a number
    return vendas.map(venda => ({
      ...venda,
      valor: Number(venda.valor),
    }));
  }

  async create(createVendaDto: CreateVendaDto): Promise<Venda> {
    const venda = this.vendaRepository.create({
      ...createVendaDto,
      data: new Date(createVendaDto.data),
    });
    return this.vendaRepository.save(venda);
  }

  async getEstatisticas() {
    const clientes = await this.clienteRepository
      .createQueryBuilder('cliente')
      .leftJoinAndSelect('cliente.vendas', 'vendas')
      .getMany();

    let maiorVolume = null;
    let maiorMedia = null;
    let maiorFrequencia = null;

    for (const cliente of clientes) {
      if (cliente.vendas.length === 0) continue;

      const totalVendas = cliente.vendas.reduce((sum, venda) => sum + Number(venda.valor), 0);
      const numeroVendas = cliente.vendas.length;
      const mediaVendas = totalVendas / cliente.vendas.length;
      const diasUnicos = new Set(cliente.vendas.map(v => {
        let data: Date;
        if (v.data instanceof Date) {
          data = v.data;
        } else if (typeof v.data === 'string') {
          data = new Date(v.data);
        } else {
          data = new Date();
        }
        
        if (isNaN(data.getTime())) {
          return new Date().toISOString().split('T')[0];
        }
        
        return data.toISOString().split('T')[0];
      })).size;

      if (!maiorVolume || numeroVendas > maiorVolume.total) {
        maiorVolume = {
          cliente: cliente.nomeCompleto,
          total: numeroVendas,
        };
      }

      if (!maiorMedia || mediaVendas > maiorMedia.media) {
        maiorMedia = {
          cliente: cliente.nomeCompleto,
          media: mediaVendas,
        };
      }

      if (!maiorFrequencia || diasUnicos > maiorFrequencia.dias) {
        maiorFrequencia = {
          cliente: cliente.nomeCompleto,
          dias: diasUnicos,
        };
      }
    }

    return {
      maiorVolume,
      maiorMedia,
      maiorFrequencia,
    };
  }
} 