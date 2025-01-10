import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../modules/auth/auth.controller';
import { AuthService } from '../../modules/auth/auth.service';
import { UserDto } from '../../dtos/user.dto';

describe('AuthController', () => {
  let controller: AuthController;

  const mockAuthService = {
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    const mockUserDto: UserDto = {
      username: 'testuser',
      password: 'testpassword',
    };

    it('should call AuthService.login with correct parameters', async () => {
      const result = { accessToken: 'mockedAccessToken' };
      mockAuthService.login.mockResolvedValue(result);

      const response = await controller.login(mockUserDto);

      expect(response).toBe(result);
      expect(mockAuthService.login).toHaveBeenCalledWith(mockUserDto);
    });

    it('should throw an error if AuthService.login fails', async () => {
      mockAuthService.login.mockRejectedValue(new Error('Invalid credentials'));

      await expect(controller.login(mockUserDto)).rejects.toThrow(
        'Invalid credentials',
      );
      expect(mockAuthService.login).toHaveBeenCalledWith(mockUserDto);
    });
  });
});
