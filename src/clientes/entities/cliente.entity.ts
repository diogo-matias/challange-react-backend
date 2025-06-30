import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Venda } from '../../vendas/entities/venda.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeCompleto: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'date' })
  dataNascimento: Date;

  @OneToMany(() => Venda, venda => venda.cliente)
  vendas: Venda[];
} 