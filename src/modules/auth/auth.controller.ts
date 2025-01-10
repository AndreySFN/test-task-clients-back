// src/auth/auth.controller.ts
import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserDto } from '../../dtos/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() dto: UserDto) {
    return this.authService.login(dto);
  }
}
