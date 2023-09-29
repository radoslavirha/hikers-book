import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://0.0.0.0:8083/graphql',
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
