import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './schemas/client.schema';
import { ClientDto } from './schemas/client.dto';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  async create(@Body() createClientDto: ClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get()
  async findAll(@Query() query?: string) {
    return this.clientService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.clientService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: Partial<ClientDto>,
  ) {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.clientService.remove(id);
  }
}
