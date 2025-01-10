import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../modules/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../../dtos/user.dto';

describe('AuthService', () => {
  let authService: AuthService;

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    const mockUserDto: UserDto = {
      username: 'testuser',
      password: 'testpassword',
    };

    it('should return accessToken if credentials are valid', async () => {
      // Mock environment variables
      mockConfigService.get.mockImplementation((key: string) => {
        if (key === 'USER_NAME') return 'testuser';
        if (key === 'HASHED_PASSWORD')
          return bcrypt.hashSync('testpassword', 10);
      });

      // Mock JWT sign
      mockJwtService.sign.mockReturnValue('mockedAccessToken');

      const result = await authService.login(mockUserDto);

      expect(result).toEqual({ accessToken: 'mockedAccessToken' });
      expect(mockConfigService.get).toHaveBeenCalledWith('USER_NAME');
      expect(mockConfigService.get).toHaveBeenCalledWith('HASHED_PASSWORD');
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: 'testuser',
      });
    });

    it('should throw UnauthorizedException if username is incorrect', async () => {
      mockConfigService.get.mockImplementation((key: string) => {
        if (key === 'USER_NAME') return 'wronguser';
        if (key === 'HASHED_PASSWORD')
          return bcrypt.hashSync('testpassword', 10);
      });

      await expect(authService.login(mockUserDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      mockConfigService.get.mockImplementation((key: string) => {
        if (key === 'USER_NAME') return 'testuser';
        if (key === 'HASHED_PASSWORD')
          return bcrypt.hashSync('wrongpassword', 10);
      });

      await expect(authService.login(mockUserDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
