import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { ClientDto } from '../dtos/client.dto';

@Schema()
export class Client extends Document implements ClientDto {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  contact: string;

  @Prop({ required: false })
  about: string;

  @Prop({ required: false })
  phoneNumber: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
