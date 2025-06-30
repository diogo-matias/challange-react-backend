import { IsString, IsEmail, IsDateString } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  nomeCompleto: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dataNascimento: string;
} 