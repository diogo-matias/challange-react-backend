import { Repository } from 'typeorm';
import { Venda } from './entities/venda.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
interface CreateVendaDto {
    clienteId: number;
    valor: number;
    data: string;
}
export declare class VendasService {
    private vendaRepository;
    private clienteRepository;
    constructor(vendaRepository: Repository<Venda>, clienteRepository: Repository<Cliente>);
    getVendasPorDia(): Promise<any[]>;
    getVendasPorCliente(clienteId: number): Promise<{
        valor: number;
        id: number;
        data: Date;
        cliente: Cliente;
        clienteId: number;
    }[]>;
    create(createVendaDto: CreateVendaDto): Promise<Venda>;
    getEstatisticas(): Promise<{
        maiorVolume: any;
        maiorMedia: any;
        maiorFrequencia: any;
    }>;
}
export {};
