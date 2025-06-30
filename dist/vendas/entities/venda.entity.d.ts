import { Cliente } from '../../clientes/entities/cliente.entity';
export declare class Venda {
    id: number;
    valor: number;
    data: Date;
    cliente: Cliente;
    clienteId: number;
}
