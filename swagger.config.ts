import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Trusted Stake API')
  .setDescription('API of the trusted stake platform')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
