import { Venda } from '../../vendas/entities/venda.entity';
export declare class Cliente {
    id: number;
    nomeCompleto: string;
    email: string;
    dataNascimento: Date;
    vendas: Venda[];
}
