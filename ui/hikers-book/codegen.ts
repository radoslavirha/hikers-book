import type { CodegenConfig } from '@graphql-codegen/cli';
import path from 'path';

const config: CodegenConfig = {
  overwrite: true,
  schema: path.join(__dirname, '../../api/graphql/src/v1/resources/schema.gql'),
  documents: 'src/**/*.graphql',
  generates: {
    'src/graphql/generated.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
      config: { withHooks: true, addExplicitOverride: true }
    },
    'src/': {
      preset: 'near-operation-file',
      presetConfig: { extension: '.generated.ts', baseTypesPath: 'graphql/generated.ts' },
      plugins: ['typescript', 'typescript-operations', 'typescript-apollo-angular'],
      config: { withHooks: true, addExplicitOverride: true }
    }
  }
};

export default config;
