import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { ConfigService } from './core/services/config.service';

export function createApollo(httpLink: HttpLink, configService: ConfigService): ApolloClientOptions<unknown> {
  return {
    link: httpLink.create({ uri: configService.config.api.graphql }),
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, ConfigService]
    }
  ]
})
export class GraphQLModule {}
