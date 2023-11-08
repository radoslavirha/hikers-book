import { ConfigLoder } from '@hikers-book/tsed-common/server';
import { $log } from '@tsed/common';
import { PlatformExpress } from '@tsed/platform-express';
import { Server } from './Server';
import { ConfigService } from './global/services/ConfigService';

async function bootstrap() {
  try {
    const config = new ConfigLoder(ConfigService.service, ConfigService.port, ConfigService.configModel);

    const configuration: Partial<TsED.Configuration> = {
      ...config.server,
      api: config.api,
      swagger: config.swagger,
      mongoose: [
        {
          id: 'trips',
          url: config.config.mongodb.url,
          connectionOptions: config.config.mongodb.connectionOptions
        }
      ],
      ioredis: [
        {
          name: 'default',
          cache: true,
          ...config.config.redis.default
        }
      ],
      cache: {
        ttl: 300
      }
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
