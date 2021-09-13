import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { HttpStatus, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppConfig, appConfiguration } from '@nx-mess/chat-api/config/utils';
import { getFullQueueName, USER_QUEUE } from '@nx-mess/chat-api/shared/utils';

import * as compression from 'compression';
import * as helmet from 'helmet';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const bullServerAdapter = new ExpressAdapter();

  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<AppConfig>(appConfiguration.KEY);

  app.enableCors();

  app.use(compression());
  app.use(helmet());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.use('/robots.txt', (_, res) => {
    res.send('User-Agent: *\n' + 'Disallow: /');
  });
  app.use('/favicon.ico', (_, res) => {
    res.sendStatus(HttpStatus.NO_CONTENT).end();
  });

  // BullBoard
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

  await app.listen(appConfig.port, () => {
    Logger.log(`Listening on: ${appConfig.domain}/${globalPrefix}`);
  });
}

void bootstrap();
