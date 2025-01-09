import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Client extends Document {
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
