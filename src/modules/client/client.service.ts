import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client } from '../../schemas/client.schema';
import { ClientDto } from '../../dtos/client.dto';
import { wrongIdHandler } from '../../utils/db-utils';

// TODO: Подумать, что вынести

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  async create(client: ClientDto): Promise<ClientDto> {
    return this.clientModel.create(client);
  }

  async getTotal(query?: any): Promise<number> {
    const { search } = query || {};

    const filter = search
      ? {
          $or: [
            { name: new RegExp(search, 'i') },
            { company: new RegExp(search, 'i') },
          ],
        }
      : {};

    return this.clientModel.countDocuments(filter).exec();
  }

  async findAll(query?: any): Promise<{ data: ClientDto[]; total: number }> {
    const { search, sortField, sortOrder, limit = 10, page = 1 } = query || {};

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

    const skip = (page - 1) * limit;

    const total = await this.clientModel.countDocuments(filter);

    const data = await this.clientModel
      .find(filter)
      // @ts-expect-error TODO: Убрать
      .sort(sort)
      .select('-details')
      .skip(skip)
      .limit(Number(limit))
      .exec();

    return { data, total };
  }

  async findOne(id: string): Promise<ClientDto> {
    return wrongIdHandler(await this.clientModel.findById(id).exec());
  }

  async update(id: string, client: Partial<ClientDto>): Promise<ClientDto> {
    return wrongIdHandler(
      await this.clientModel
        .findByIdAndUpdate(id, client, { new: true })
        .exec(),
    );
  }

  async remove(id: string): Promise<ClientDto> {
    return wrongIdHandler(await this.clientModel.findByIdAndDelete(id).exec());
  }
}
