import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import helmet from 'helmet';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { AppModule } from 'src/app.module';

async function bootstrap() {
  const port = process.env.NEST_PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  if (process.env.NODE_ENV === 'development') {
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
    const swaggerConfig = new DocumentBuilder()
      .setTitle(process.env.APP_NAME)
      .setDescription(process.env.APP_DESCRIPTION)
      .setVersion(process.env.APP_VERSION)
      .addBearerAuth()
      .build();
    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: process.env.APP_DESCRIPTION,
    };
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api-docs', app, document, customOptions);
  } else {
    const whitelist = [process.env.APP_FRONTEND_URL];
    app.enableCors({
      origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
    });
  }
  useContainer(app.select(AppModule), {
    fallbackOnErrors: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(cookieParser());
  await app.listen(port);
  console.log(`Application listening in port: ${port}`);
}

bootstrap();
