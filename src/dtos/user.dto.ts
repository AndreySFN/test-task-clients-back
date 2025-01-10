import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Document } from 'mongoose';
import { Prop } from "@nestjs/mongoose";

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
