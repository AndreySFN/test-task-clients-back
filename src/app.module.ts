import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './app/client/client.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/clients_db'),
    ClientModule,
  ],
})
export class AppModule {}
