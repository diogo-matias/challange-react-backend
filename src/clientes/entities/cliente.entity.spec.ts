import { Cliente } from './cliente.entity';

describe('Cliente Entity', () => {
  it('should be defined', () => {
    expect(new Cliente()).toBeDefined();
  });

  it('should create cliente with data', () => {
    const cliente = new Cliente();
    cliente.id = 1;
    cliente.nomeCompleto = 'João Silva';
    cliente.email = 'joao@example.com';
    cliente.dataNascimento = new Date('1990-01-01');
    cliente.vendas = [];

    expect(cliente.id).toBe(1);
    expect(cliente.nomeCompleto).toBe('João Silva');
    expect(cliente.email).toBe('joao@example.com');
    expect(cliente.dataNascimento).toEqual(new Date('1990-01-01'));
    expect(cliente.vendas).toEqual([]);
  });
}); 