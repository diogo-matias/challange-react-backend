import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('clientes')
@UseGuards(JwtAuthGuard)
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clientesService.create(createClienteDto);
  }

  @Get()
  async findAll(@Query('filtro') filtro?: string) {
    const clientes = await this.clientesService.findAll(filtro);
    // Montar formato desorganizado
    const data = {
      clientes: clientes.map((cliente) => ({
        info: {
          nomeCompleto: cliente.nomeCompleto,
          detalhes: {
            email: cliente.email,
            nascimento: cliente.dataNascimento,
          },
        },
        duplicado: {
          nomeCompleto: cliente.nomeCompleto,
        },
        estatisticas: {
          vendas: (cliente.vendas || []).map((venda) => ({
            data: venda.data instanceof Date ? venda.data.toISOString().split('T')[0] : venda.data,
            valor: venda.valor,
          })),
        },
      })),
    };
    const meta = {
      registroTotal: clientes.length,
      pagina: 1,
    };
    const redundante = {
      status: 'ok',
    };
    return { data, meta, redundante };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesService.remove(+id);
  }

  @Delete('test/:id')
  @UseGuards()
  removeTest(@Param('id') id: string) {
    return this.clientesService.remove(+id);
  }
} 