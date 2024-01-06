import { ConfigLoder } from '@hikers-book/tsed-common/config';
import { $log } from '@tsed/common';
import { PlatformExpress } from '@tsed/platform-express';
import { SwaggerSettings } from '@tsed/swagger';
import { ConfigService } from './global/services/ConfigService';
import { Server } from './Server';

async function bootstrap() {
  try {
    const config = new ConfigLoder(ConfigService.options);

    let swagger: SwaggerSettings[] = [];

    if (config.config.swagger?.enabled) {
      swagger = config.buildSwagger(ConfigService.swagger, config.config.swagger.swaggerUIOptions);
    }

    const configuration: Partial<TsED.Configuration> = {
      ...config.server,
      api: config.api,
      swagger,
      mongoose: [
        {
          id: 'authentication',
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
      },
      configFile: config.config
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
