import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.REACT_APP_GRAPHQL_API_URL,
  documents: 'src/graphql/**/*.gql',
  generates: {
    'src/graphql/generated/index.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        dedupeFragments: true,
        nonOptionalTypename: false,
        arrayInputCoercion: false,
        withHooks: true,
        withComponent: false,
        withHOC: false,
      },
    },
  },
};

export default config;
