import { VendasService } from './vendas.service';
export declare class VendasController {
    private readonly vendasService;
    constructor(vendasService: VendasService);
    create(createVendaDto: {
        clienteId: number;
        valor: number;
        data: string;
    }): Promise<import("./entities/venda.entity").Venda>;
    getVendasPorDia(): Promise<any[]>;
    getEstatisticas(): Promise<{
        maiorVolume: any;
        maiorMedia: any;
        maiorFrequencia: any;
    }>;
    getVendasPorCliente(clienteId: string): Promise<{
        valor: number;
        id: number;
        data: Date;
        cliente: import("../clientes/entities/cliente.entity").Cliente;
        clienteId: number;
    }[]>;
}
