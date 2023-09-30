import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

export type Config = {
  api: {
    graphql: string;
  };
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config?: Config;
  configLoaded = false;

  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http.get<Config>('./assets/config.json').subscribe({
      next: (config) => {
        this.config = config;
        this.configLoaded = true;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error, 'app configuration file not found');
      }
    });
  }
}
