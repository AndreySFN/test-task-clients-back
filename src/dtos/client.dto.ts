import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ClientDetails } from '../schemas/client-details.schema';

export class ClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsOptional()
  details: ClientDetails;
}
