import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Использование ValidationPipe для валидации данных
  app.useGlobalPipes(new ValidationPipe());

  // Настройка порта
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();
