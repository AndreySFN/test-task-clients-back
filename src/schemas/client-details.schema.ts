import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ClientDetailsDto } from '../dtos/client-details.dto';

@Schema()
export class ClientDetails extends Document implements ClientDetailsDto {
  @Prop({ required: true })
  contact: string;

  @Prop({ required: false })
  about: string;

  @Prop({ required: false })
  phoneNumber: string;
}

export const ClientDetailsSchema = SchemaFactory.createForClass(ClientDetails);
