import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Config = {
  api: {
    authentication: string;
    graphql: string;
  };
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _config!: Config;
  private _configLoaded = false;

  constructor(private http: HttpClient) {}

  public get config(): Config {
    return this._config;
  }
  public get configLoaded(): boolean {
    return this._configLoaded;
  }

  public loadConfig() {
    return this.http.get<Config>('./assets/config/config.json').subscribe({
      next: (config) => {
        this._config = config;
        this._configLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error, 'app configuration file not found');
      }
    });
  }
}
