import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from '../../modules/client/client.controller';
import { ClientService } from '../../modules/client/client.service';

const mockClient = {
  _id: '64b7b9f8f8c8c9c8c9c8c9c8',
  name: 'Иван Иванов',
  company: 'ООО Ромашка',
  contact: 'ivan@example.com',
  about: 'Специалист в области логистики.',
  phoneNumber: '+7 (900) 123-45-67',
};

const mockClientService = {
  create: jest.fn().mockResolvedValue(mockClient),
  findAll: jest.fn().mockResolvedValue([mockClient]),
  findOne: jest.fn().mockResolvedValue(mockClient),
  update: jest.fn().mockResolvedValue(mockClient),
  remove: jest.fn().mockResolvedValue(mockClient),
};

describe('ClientController', () => {
  let controller: ClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [{ provide: ClientService, useValue: mockClientService }],
    }).compile();

    controller = module.get<ClientController>(ClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a client', async () => {
    const result = await controller.create(mockClient as any);
    expect(result).toEqual(mockClient);
    expect(mockClientService.create).toHaveBeenCalledWith(mockClient);
  });

  it('should find all clients', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockClient]);
    expect(mockClientService.findAll).toHaveBeenCalled();
  });

  it('should find a client by id', async () => {
    const result = await controller.findOne(mockClient._id);
    expect(result).toEqual(mockClient);
    expect(mockClientService.findOne).toHaveBeenCalledWith(mockClient._id);
  });

  it('should update a client', async () => {
    const result = await controller.update(mockClient._id, {
      name: 'Updated Name',
    });
    expect(result).toEqual(mockClient);
    expect(mockClientService.update).toHaveBeenCalledWith(mockClient._id, {
      name: 'Updated Name',
    });
  });

  it('should delete a client', async () => {
    const result = await controller.remove(mockClient._id);
    expect(result).toEqual(mockClient);
    expect(mockClientService.remove).toHaveBeenCalledWith(mockClient._id);
  });
});
