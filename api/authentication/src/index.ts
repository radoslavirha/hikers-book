import { ConfigLoder } from '@hikers-book/tsed-common/server';
import { $log } from '@tsed/common';
import { PlatformExpress } from '@tsed/platform-express';
import { Server } from './Server';
import { ConfigService } from './services';

async function bootstrap() {
  try {
    const config = new ConfigLoder(ConfigService.service, ConfigService.port, ConfigService.configModel);

    const configuration = {
      ...config.server,
      api: config.api,
      mongoose: [
        {
          id: 'authentication',
          url: config.config.mongodb.url,
          connectionOptions: config.config.mongodb.connectionOptions
        }
      ]
    };

    const platform = await PlatformExpress.bootstrap(Server, configuration);
    await platform.listen();

    process.on('SIGINT', () => {
      platform.stop();
    });
  } catch (error) {
    $log.error({ event: 'SERVER_BOOTSTRAP_ERROR', message: (error as Error).message, stack: (error as Error).stack });
  }
}

bootstrap();
