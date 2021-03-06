import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { env } from 'process';
import { Logger } from '@nestjs/common';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [env.RABBIT_URL],
      noAck: false,
      queue: 'admin-backend',
    },
  });
  await app.listen(() => logger.log('Microservice is listening'));
}
bootstrap();
