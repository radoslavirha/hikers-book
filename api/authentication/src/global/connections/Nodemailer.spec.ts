/* eslint-disable import/no-duplicates */
import { DITest } from '@tsed/di';
import Mailer from 'nodemailer/lib/mailer';
import { ConfigService } from '../services/ConfigService';
import { NODEMAILER_TOKEN } from './InjectionToken';
import { NODEMAILER } from './Nodemailer';

import './Nodemailer';

describe('Nodemailer', () => {
  beforeEach(() => DITest.create({}));
  afterEach(() => DITest.reset());

  it('Should create transporter', async () => {
    const config = DITest.get<ConfigService>(ConfigService);
    const transporter = DITest.get<NODEMAILER>(NODEMAILER_TOKEN);

    expect(transporter).toBeInstanceOf(Mailer);
    expect(transporter.options).toStrictEqual(config.config.nodemailer);
  });
});
