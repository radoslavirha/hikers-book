import { PlatformTest } from '@tsed/common';
import { minify } from 'html-minifier';
import { join } from 'path';
import SuperTest from 'supertest';
import { BaseServer } from '../server/ServerBase';
import { SwaggerController } from './SwaggerController';

describe('SwaggerController', () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(
    PlatformTest.bootstrap(BaseServer, {
      mount: {
        '/': [SwaggerController]
      },
      views: {
        root: join(process.cwd(), 'src/views'),
        extensions: {
          ejs: 'ejs'
        }
      },
      swagger: [
        {
          path: '/v1',
          doc: 'v1',
          specVersion: '3.0.3',
          spec: {
            info: {
              title: `Hiker's Book`,
              version: '1.0.0',
              description: `Hiker's Book`
            }
          }
        },
        {
          path: '/v2',
          doc: 'v2',
          specVersion: '3.0.3',
          spec: {
            info: {
              title: `Hiker's Book`,
              version: '1.0.0',
              description: `Hiker's Book`
            }
          }
        }
      ],
      api: {
        service: `Test API`,
        version: '1.0.0'
      }
    })
  );
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it('Should call GET /', async () => {
    const response = await request.get('/');

    const minified = minify(response.text, { collapseWhitespace: true });

    expect(minified).toContain(`<title>Test API 1.0.0</title>`);
    expect(minified).toContain(`<h1>Test API 1.0.0</h1>`);
    expect(minified).toContain(`<li><a href="/v1"><span>API v1</span> <span>OpenSpec 3.0.3</span></a></li>`);
    expect(minified).toContain(`<li><a href="/v2"><span>API v2</span> <span>OpenSpec 3.0.3</span></a></li>`);
    expect(response.status).toEqual(200);
  });
});
