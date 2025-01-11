import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientDto } from '../../dtos/client.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  async findAll(@Query() query?: string) {
    return this.clientService.findAll(query);
  }

  @Get('total')
  async getTotal() {
    return this.clientService.getTotal();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createClientDto: ClientDto) {
    return this.clientService.create(createClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: Partial<ClientDto>,
  ) {
    return this.clientService.update(id, updateClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
