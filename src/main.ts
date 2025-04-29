import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Qvema API')
    .setDescription('The Qvema API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });

  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}

void bootstrap();
