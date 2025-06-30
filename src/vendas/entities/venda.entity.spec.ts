import { Venda } from './venda.entity';

describe('Venda Entity', () => {
  it('should be defined', () => {
    expect(new Venda()).toBeDefined();
  });

  it('should have correct properties', () => {
    const venda = new Venda();
    
    expect(venda).toHaveProperty('id');
    expect(venda).toHaveProperty('valor');
    expect(venda).toHaveProperty('data');
    expect(venda).toHaveProperty('cliente');
    expect(venda).toHaveProperty('clienteId');
  });

  it('should create venda with data', () => {
    const venda = new Venda();
    venda.id = 1;
    venda.valor = 100.50;
    venda.data = new Date('2024-01-01');
    venda.clienteId = 1;

    expect(venda.id).toBe(1);
    expect(venda.valor).toBe(100.50);
    expect(venda.data).toEqual(new Date('2024-01-01'));
    expect(venda.clienteId).toBe(1);
  });
}); 