import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { HttpStatus, INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig, appConfiguration } from '@nx-mess/chat-api/utils-config';
import {
  getFullQueueName,
  HttpExceptionFilter,
  USER_QUEUE,
} from '@nx-mess/chat-api/utils-shared';

import * as compression from 'compression';
import * as helmet from 'helmet';

import { AppModule } from './app/app.module';

function configureSwagger(
  appConfig: AppConfig,
  app: INestApplication,
  globalPrefix: string
) {
  const swaggerDocOptions = new DocumentBuilder()
    .setTitle('Nx Messenger API')
    .setDescription('API documentation for Nx Messenger')
    .setVersion('1.0.0')
    .addServer(`${appConfig.domain}`, 'Development API')
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions, {
    operationIdFactory: (_, methodKey) => methodKey,
  });
  SwaggerModule.setup('api/docs', app, swaggerDoc, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });
  Logger.log(
    `Swagger Docs enabled: ${appConfig.domain}/${globalPrefix}/docs`,
    'NestApplication'
  );
}

function configureNoContentHandlers(app: INestApplication) {
  app.use('/robots.txt', (_, res) => {
    res.send('User-Agent: *\n' + 'Disallow: /');
  });
  app.use('/favicon.ico', (_, res) => {
    res.sendStatus(HttpStatus.NO_CONTENT).end();
  });
}

function configureBullBoard(
  app: INestApplication,
  bullServerAdapter: ExpressAdapter
) {
  const queues = [USER_QUEUE].map(
    (queueName) => new BullAdapter(app.get(getFullQueueName(queueName)))
  );
  const bullBoardPath = '/admin/queues';
  createBullBoard({
    queues,
    serverAdapter: bullServerAdapter,
  });
  bullServerAdapter.setBasePath(bullBoardPath);
  app.use(bullBoardPath, bullServerAdapter.getRouter());
}

async function bootstrap() {
  const bullServerAdapter = new ExpressAdapter();

  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<AppConfig>(appConfiguration.KEY);

  app.enableCors();

  app.use(compression());
  app.use(helmet());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  configureSwagger(appConfig, app, globalPrefix);
  configureNoContentHandlers(app);
  configureBullBoard(app, bullServerAdapter);

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(appConfig.port, () => {
    Logger.log(`Listening on: ${appConfig.domain}/${globalPrefix}`);
  });
}

void bootstrap();
