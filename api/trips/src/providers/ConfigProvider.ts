import { registerProvider } from '@tsed/di';
import { ConfigService } from '../services/ConfigService';

registerProvider({
  provide: ConfigService,
  useClass: ConfigService
});
