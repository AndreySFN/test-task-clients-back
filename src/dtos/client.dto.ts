import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ClientDetailsDto } from './client-details.dto';

export class ClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsOptional()
  details: ClientDetailsDto;
}
