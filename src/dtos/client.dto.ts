import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Document } from 'mongoose';
import { Prop } from "@nestjs/mongoose";

export class ClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsString()
  @IsOptional()
  about: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;
}
