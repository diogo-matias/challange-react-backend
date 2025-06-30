import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('vendas')
@UseGuards(JwtAuthGuard)
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post()
  create(@Body() createVendaDto: { clienteId: number; valor: number; data: string }) {
    return this.vendasService.create(createVendaDto);
  }

  @Get('por-dia')
  getVendasPorDia() {
    return this.vendasService.getVendasPorDia();
  }

  @Get('estatisticas')
  getEstatisticas() {
    return this.vendasService.getEstatisticas();
  }

  @Get('cliente/:clienteId')
  getVendasPorCliente(@Param('clienteId') clienteId: string) {
    return this.vendasService.getVendasPorCliente(+clienteId);
  }
} 