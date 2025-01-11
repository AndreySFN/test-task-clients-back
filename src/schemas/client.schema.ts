import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClientDto } from '../dtos/client.dto';
import { ClientDetails, ClientDetailsSchema } from './client-details.schema';

@Schema()
export class Client extends Document implements ClientDto {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  company: string;

  @Prop({ type: ClientDetailsSchema, required: false })
  details: ClientDetails;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
