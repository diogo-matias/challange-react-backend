import { Venda } from './venda.entity';

describe('Venda Entity', () => {
  it('should be defined', () => {
    expect(new Venda()).toBeDefined();
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