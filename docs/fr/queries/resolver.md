# Resolver
Un resolver est une classe qui accueille des **query**, des **mutation** ou des **subscription**.

## `@Query` et `@Mutation`
Ces deux décorateurs fonctionnent de la même façon, excepté que l'un déclarer un champ dans votre type `Query` et l'autre dans le type `Mutation`.
Ce sont au final des décorateurs `@Field` qui déclare un champ dans leur type respectif (`type Query` ou `type Mutation`), il accepte alors les mêmes paramètres que `@Field` ([détails](/graphql-composer-decorators/fr/types/field)).

```ts
@ObjectType()
class Response {
  // ...
} 

@Resolver()
class Resolver {
  @Query()
  queryMe(): Response {
    // ...
  }

  @Mutation()
  mutateMe() {
    // ...
  }
}
```
Donnera en SDL:
```graphql
type Query {
  queryMe: Response
}

type Mutation {
  mutateMe: Response
}
```

## `@Arg` and `@Args`
Vos `query`, `mutation` et `subscription` peuvent avoir des arguments, pour les déclarer il y'a deux décorateurs:
- `@Arg`, déclare un seul argument
- `@Args`, déclare un ensemble d'argument grâce à un `@InputType`

> Les arguments sont convertis en instances de class s'ils ont une class liée.

### `@Arg`
```ts
@Resolver()
class Resolver {
  @Query()
  queryMe(@Arg("myArg") arg: string): Response {
    // ...
  }
}
```
Donnera en SDL:
```graphql
type Query {
  queryMe(arg: String): Response
}
```

### `@Args`
```ts
@InputType()
class Args {
  @Field()
  count: number;

  @Field()
  name: string;
}

@Resolver()
class Resolver {
  @Query()
  queryMe(@Args() args: Args): Response {
    // ...
  }
}
```
Donnera en SDL:
```graphql
type Query {
  queryMe(count: Float, name: String): Response
}
```

## Subscriptions
C'est un peu différent pour une subscription, celle-ci fonctionne également comme `@Query` et `@Mutation`. Les subscriptions seront ajouté au type GraphQL `Subscription`. Cependant il lui faut indique une fonction subscribe dans ses paramètres.  

Vous pouvez donc choisir la librairie souhaitée pour vos subscriptions, voici un exemple avec `graphql-subscriptions`.  

> Lorsque vous utiliser `PubSub.publish`, la valeur de la payload est injectée dans `Context.source`.

```ts
import { Context } from "graphql-composer";
import { PubSub } from "graphql-subcriptions";

const pubsub = new PubSub();

@ObjectType()
class Response {
  // ...
} 

@Resolver()
class Resolver {
  @Subscription({
    // Executed when the client subscribe to the event, to determine the topic
    subscription: (args) => pubsub.asyncIterator("NOTIFICATION"),
  })
  // Executed when the pubsub publish to the specified topic
  mySubscription(ctx: Context): Response {
    // The payload is injected into ctx.source
    console.log(ctx.souce);
    // ...
  }

  @Query()
  trigger(): Response {
    pubsub.publish("NOTIFICATION", { payload: "my data" });
    // ...
  }
}
```

Pour les personnes familières de la façon de faire avec le module `graphql`, cela donnerait:
```js
const resolvers = {
  Subscription: {
    subscribe: () => pubsub.asyncIterator("NOTIFICATION"),
    resolve: () => {
      console.log("Triggered");
      // ...
    }
  }
}
```
Ce qui donne en SDL:
```graphql
type Subscription {
  mySubscription: Response
}
```

## L'objet `Context`
L'objet `Context<BodyType = any, SourceType = any>` est injecté après vos arguments dans une méthode, celui-ci contient toutes les informations de la requête:
| Propriété | Type | Description
|-|-|-|
| body | `BodyType (any)` | La réponse envoyée au client |
| field | `Field` | Contiens la référence à l'objet `Field` de `graphql-composer`, vous donnant accès à toutes les informations du champ |
| context | `any` | Le context GraphQL |
| infos | `GraphQLResolveInfo` | L'objet infos de GraphQL |
| source | `SourceType (any)` | L'objet source GraphQL, **la payload d'une subscription** |
| rawArgs | `any` | Les arguments non convertis en instance de class, les arguments tels quels |

## Renvoyer un résultat
Vous pouvez renvoyer un résultat de deux façons différentes:
- En utilisant `return` (peut être contraignant lorsque vous utiliser les middlewares avec la fonction `next`)
- En assignant `Context.body` à une valeur

```ts
import { Context } from "graphql-composer";

@ObjectType()
class Response {
  // ...
} 

@Resolver()
class Resolver {
  @Query()
  returned(): Response {
    return new Response();
  }

  @Query()
  ctxBody(context: Context) {
    context.body = new Response();
  }
}
```
