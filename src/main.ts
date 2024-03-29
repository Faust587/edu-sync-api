import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(process.env.JWT_SECRET));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(+process.env.PORT || 4000);
}
bootstrap();
