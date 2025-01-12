import { IsArray, IsNumber } from 'class-validator';
import { ClientDto } from './client.dto';

export class ClientListDto {
  @IsArray()
  data: ClientDto[];

  @IsNumber()
  total: number;
}
