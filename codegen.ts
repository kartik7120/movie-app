
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./graphql/schema.graphql",
  generates: {
    "./schemaTypes.ts": {
      plugins: ["typescript", "typescript-document-nodes", "typescript-resolvers"]
    },
    "./graphql.schema.json": {
      plugins: ["introspection"]
    },
  },
};

export default config;