import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger("NestApplication")

  const { PORT = 4000 } = process.env

  await app.listen(PORT, () => {
    logger.log(`Application started on port ${PORT}`)
  });
}
bootstrap();
