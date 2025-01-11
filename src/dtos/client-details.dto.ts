import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ClientDetailsDto {
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
