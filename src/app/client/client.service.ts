import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from './schemas/client.schema';
import { ClientDto } from './schemas/client.dto';
// import { CreateClientDto } from './schemas/dtos/CreateClientDTO';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  async create(client: ClientDto): Promise<ClientDto> {
    return this.clientModel.create(client);
  }

  async findAll(query?: any): Promise<ClientDto[]> {
    const { search, sortField, sortOrder } = query || {};
    const filter = search
      ? {
          $or: [
            { name: new RegExp(search, 'i') },
            { company: new RegExp(search, 'i') },
          ],
        }
      : {};

    const sort = sortField
      ? { [sortField]: sortOrder === 'desc' ? -1 : 1 }
      : {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return this.clientModel.find(filter).sort(sort).exec();
  }

  async findOne(id: string): Promise<ClientDto> {
    return this.clientModel.findById(id).exec();
  }

  async update(id: string, client: Partial<ClientDto>): Promise<ClientDto> {
    return this.clientModel.findByIdAndUpdate(id, client, { new: true }).exec();
  }

  async remove(id: string): Promise<ClientDto> {
    return this.clientModel.findByIdAndDelete(id).exec();
  }
}
