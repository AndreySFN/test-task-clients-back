import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../../dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService, // Для доступа к .env
  ) {}

  async login(dto: UserDto): Promise<{ accessToken: string }> {
    const username = this.configService.get<string>('USER_NAME'); // Получаем хэш из .env
    const hashedPassword = this.configService.get<string>('HASHED_PASSWORD'); // Получаем хэш из .env

    if (
      username !== dto.username ||
      !(await bcrypt.compare(dto.password, hashedPassword))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
