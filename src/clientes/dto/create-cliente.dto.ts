import { IsString, IsEmail, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  @IsNotEmpty()
  nomeCompleto: string;

  @IsEmail()
  email: string;

  @IsDateString()
  dataNascimento: string;
} 