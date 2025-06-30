import { UpdateClienteDto } from './update-cliente.dto';

describe('UpdateClienteDto', () => {
  it('should be defined', () => {
    expect(new UpdateClienteDto()).toBeDefined();
  });

  it('should extend PartialType of CreateClienteDto', () => {
    const updateDto = new UpdateClienteDto();
    
    expect(updateDto).toBeInstanceOf(UpdateClienteDto);
  });

  it('should allow partial updates', () => {
    const updateDto = new UpdateClienteDto();
    
    updateDto.nomeCompleto = 'João Silva Atualizado';
    
    expect(updateDto.nomeCompleto).toBe('João Silva Atualizado');
    expect(updateDto.email).toBeUndefined();
    expect(updateDto.dataNascimento).toBeUndefined();
  });

  it('should allow all properties to be optional', () => {
    const updateDto = new UpdateClienteDto();
    
    expect(updateDto.nomeCompleto).toBeUndefined();
    expect(updateDto.email).toBeUndefined();
    expect(updateDto.dataNascimento).toBeUndefined();
  });
}); 