# Commencer
Pour démarrer votre application il va falloir utiliser la class `Schema` fournie par `graphql-composer-decorators` (**pas** `graphql-composer`).

# L'objet `Schema`

## `static create`
Créé une instance de `Schema`:

```ts
import { Schema } from "graphql-composer-decorators";

const schema = Schema.create()
```

## `load`
Vous permet de charger tous les décorateurs, il faut indiquer à la méthode les chemin d'accès (sous format [glob](https://github.com/isaacs/node-glob#glob)) aux fichiers de vos class ou directement passer la class en paramètres.
> De façon général, il suffit d'indiquer le chemin d'accès des resolvers, car ceux-ci vont importer tout les types et donc charger les décorateurs
```ts
import { Schema } from "graphql-composer-decorators";

const schema = Schema
  .create()
  .load(`${__dirname}/resolvers/*.ts`)
```

## `setConfig`
Vous permet de configurer votre schema.
| Propriété | Description | Type
|-|-|-|
| requiredByDefault | Si `true`, les types des champs seront NonNullable par défaut | `boolean` |
| arrayRequired | Si `true`, les types à l'intérieur des tableaux seront NonNullable par défaut (si `undefined`, prend la valeur de `requiredByDefault`) | `boolean` |
```ts
import { Schema } from "graphql-composer-decorators";

const schema = Schema
  .create()
  .load(`${__dirname}/resolvers/*.ts`)
  .setConfig({ requiredByDefault: true })
```

## `build`
Vous retourne un schema GraphQL `GraphQLSchema`, qui peut être utilisé par toutes les librairies GraphQL (Comme [Apollo](https://www.apollographql.com/) par exemple)
```ts
import { Schema } from "graphql-composer-decorators";
import { ApolloServer } from "graphql-server";

const schema = Schema
  .create()
  .load(`${__dirname}/resolvers/*.ts`)
  .setConfig({ requiredByDefault: true })
  .build()

const server = new ApolloServer({
  schema
})
```