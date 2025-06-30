import { validate } from 'class-validator';
import { CreateClienteDto } from './create-cliente.dto';

describe('CreateClienteDto', () => {
  it('should be defined', () => {
    expect(new CreateClienteDto()).toBeDefined();
  });

  describe('validation', () => {
    it('should pass validation with valid data', async () => {
      const dto = new CreateClienteDto();
      dto.nomeCompleto = 'João Silva';
      dto.email = 'joao@example.com';
      dto.dataNascimento = '1990-01-01';

      const errors = await validate(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail validation with invalid email', async () => {
      const dto = new CreateClienteDto();
      dto.nomeCompleto = 'João Silva';
      dto.email = 'invalid-email';
      dto.dataNascimento = '1990-01-01';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints).toHaveProperty('isEmail');
    });

    it('should fail validation with empty nomeCompleto', async () => {
      const dto = new CreateClienteDto();
      dto.nomeCompleto = '';
      dto.email = 'joao@example.com';
      dto.dataNascimento = '1990-01-01';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should fail validation with invalid date format', async () => {
      const dto = new CreateClienteDto();
      dto.nomeCompleto = 'João Silva';
      dto.email = 'joao@example.com';
      dto.dataNascimento = 'invalid-date';

      const errors = await validate(dto);
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints).toHaveProperty('isDateString');
    });
  });
}); 