import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache, Observable as ObservableApollo } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { Observable as ObservableRXJS } from 'rxjs';
import { AuthenticationService } from './core/services/authentication.service';
import { ConfigService } from './core/services/config.service';

const toObservable = (observableRXJS: ObservableRXJS<unknown>) =>
  new ObservableApollo((subscriber) => {
    observableRXJS.subscribe({
      next: (value) => {
        if (subscriber.closed) {
          return;
        }
        subscriber.next(value);
      },
      error: (err) => subscriber.error(err),
      complete: () => subscriber.complete()
    });
  });

export function createApollo(
  httpLink: HttpLink,
  configService: ConfigService,
  authenticationService: AuthenticationService
): ApolloClientOptions<unknown> {
  const error = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      let needsRefresh = false;

      graphQLErrors.map((err) => {
        // @ts-expect-error poorly typed
        if (err.extensions?.exception?.status === 401 || err.extensions['response']?.status === 401) {
          needsRefresh = true;
        }
      });

      if (needsRefresh) {
        return toObservable(authenticationService.refreshToken()).flatMap((access) => {
          const oldHeaders = operation.getContext()['headers'] ?? {};
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: 'Bearer ' + access
            }
          });
          return forward(operation);
        });
      }
    }
    if (networkError) {
      console.log(`[Network error]: ${ networkError }`);
    }
  });

  return {
    link: error.concat(
      httpLink.create({
        uri: configService.config.api.graphql
      })
    ),
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, ConfigService, AuthenticationService]
    }
  ]
})
export class GraphQLModule {}
