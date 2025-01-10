import { IsString, IsNotEmpty } from 'class-validator';
import { Prop } from '@nestjs/mongoose';

export class UserDto {
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  username: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;
}
