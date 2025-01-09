import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ClientService } from '../../app/client/client.service';
import { Client } from '../../app/client/schemas/client.schema';
import { Model } from 'mongoose';

const mockClient = {
  _id: '64b7b9f8f8c8c9c8c9c8c9c8',
  name: 'Иван Иванов',
  company: 'ООО Ромашка',
  contact: 'ivan@example.com',
  about: 'Специалист в области логистики.',
  phoneNumber: '+7 (900) 123-45-67',
};

const mockClientModel = {
  create: jest.fn().mockResolvedValue(mockClient),
  find: jest.fn().mockReturnValue({
    sort: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockClient]),
    }),
  }),
  findById: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockClient),
  }),
  findByIdAndUpdate: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockClient),
  }),
  findByIdAndDelete: jest.fn().mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockClient),
  }),
};

describe('ClientService', () => {
  let service: ClientService;
  let model: Model<Client>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        { provide: getModelToken(Client.name), useValue: mockClientModel },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    model = module.get<Model<Client>>(getModelToken(Client.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a client', async () => {
    const result = await service.create(mockClient as Client);
    expect(result).toEqual(mockClient);
    expect(model.create).toHaveBeenCalledWith(mockClient);
  });

  it('should find all clients', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockClient]);
    expect(model.find).toHaveBeenCalled();
  });

  it('should find a client by id', async () => {
    const result = await service.findOne(mockClient._id);
    expect(result).toEqual(mockClient);
    expect(model.findById).toHaveBeenCalledWith(mockClient._id);
  });

  it('should update a client', async () => {
    const result = await service.update(mockClient._id, {
      name: 'Updated Name',
    });
    expect(result).toEqual(mockClient);
    expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
      mockClient._id,
      { name: 'Updated Name' },
      { new: true },
    );
  });

  it('should delete a client', async () => {
    const result = await service.remove(mockClient._id);
    expect(result).toEqual(mockClient);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockClient._id);
  });
});
