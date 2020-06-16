# Getting started
To start your application you will need to use the `Schema` class provided by `graphql-composer-decorators` (**not** `graphql-composer`).

## The `Schema` object

### `static create`
Created an instance of `Schema':

```ts
import { Schema } from "graphql-composer-decorators";

const schema = Schema.create()
```

### `load`
Allows you to load all the decorators, you have to indicate to the method the paths (in [glob](https://github.com/isaacs/node-glob#glob) format) to the files of your classes or directly pass the class in parameters.
> In general, it is enough to indicate the path of the resolvers, because they will import all types and thus load the decorators.
```ts
import { Schema } from "graphql-composer-decorators";

const schema = Schema
  .create()
  .load(`${__dirname}/resolvers/*.ts`);
```

### `setConfig`
Allows you to configure your schema.
| Property | Description | Type
|-|-|-|
| requiredByDefault | If `true`, the field types will be NonNullable by default | `boolean` |
| arrayRequired | If `true`, the types inside the arrays will be NonNullable by default (if `undefined`, it takes the value of `requiredByDefault`) | `boolean` |
```ts
import { Schema } from "graphql-composer-decorators";

const schema = Schema
  .create()
  .load(`${__dirname}/resolvers/*.ts`)
  .setConfig({ requiredByDefault: true });
```

### `build`
It returns a GraphQL schema (`GraphQLSchema`), which can be used by all GraphQL libraries (such as [Apollo](https://www.apollographql.com/ for example)
```ts
import { Schema } from "graphql-composer-decorators";
import { ApolloServer } from "graphql-server";

cost schema = Schema
  .create()
  .load(`${__dirname}/resolvers/*.ts`)
  .setConfig({ requiredByDefault: true })
  .build();

const server = new ApolloServer({ schema });
```