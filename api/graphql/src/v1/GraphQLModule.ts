import { ApolloServer } from '@tsed/apollo';
import { Inject, Module } from '@tsed/di';
import { TypeGraphQLService } from '@tsed/typegraphql';
import * as resolvers from './resolvers';

@Module({
  graphql: {
    v1: {
      path: '/v1/',
      playground: true,
      buildSchemaOptions: {
        resolvers: [resolvers]
      }
    }
  }
})
export class GraphQLModule {
  @Inject()
  protected typeGraphQLService!: TypeGraphQLService;

  private server!: ApolloServer;

  public $onReady(): void | Promise<void> {
    this.server = this.typeGraphQLService.get('v1') as ApolloServer;
  }
}
