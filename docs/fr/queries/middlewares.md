# Middlewares
Les middlewares sont très répandus dans le développement backend, ceux-ci permettent d'éviter de vous répéter, de clarifier votre code et de mieux l'organiser.
Le système utilisé par ce module est basé sur le fonctionnement des middleware de [`koa`](https://koajs.com/).

## Construction et utilisation d'un middleware basé sur une fonction
Un middleware est une fonction qui est exécutée avant la fonction principale d'une requête. Celle-ci permet par exemple de vérifier qu'un utilisateur est authentifié.  
Ici nous allons créer un middleware qui vérifie la valeur d'un argument.

### 1. Déclaration
Déclarons la fonction
```ts
import { Context, Next } from "graphql-composer";

async function verifiyArgs(args, context: Context, next: Next) {
}
```

### 2. Validation
Si la condition est remplie, il faudra dire à notre middleware qu'il peut passer au middleware suivant, ceci se fait avec le paramètre `next` qui est une fonction asynchrone à appeler.  
Si `next` n'est pas appelé, le middleware suivant n'est simplement pas exécuté.
> Si vous ne mettez pas d'`await` avant `next()` le middleware courant ne va pas attendre la fin de l'exécution du middleware suivant pour exécuter la suite de son code.
```ts
import { Context, Next } from "graphql-composer";

async function verifiyArgs(args, context: Context, next: Next) {
  if (args.count > 0) {
    await next();
  }
  throw new Error("Count must be greater than 0");
}
```

### 3. Utilisation
Votre middleware peut être appliqué avec le décorateur `@Middlewares` à:
- Un **resolver**
- Un **ObjectType**
- Une **InterfaceType**
- Une **query**
- Une **mutation**
- Une **subscription**

#### Avec `@Query` ou `@Mutation` ou `@Subscription`
```ts
@Resolver()
class Resolver {
  @Query()
  @Middlewares(verifyArgs)
  query(@Arg("count") count: number) {
    // ...
  }

  @Mutation()
  @Middlewares(verifyArgs)
  mutation(@Arg("count") count: number) {
    // ..
  }

  @Subscription({ subscribe: () => pubsub.asyncIterator("NOTIF") })
  @Middlewares(verifyArgs)
  subscription(@Arg("count") count: number) {
    // ..
  }
}
```

#### Avec `@Resolver` (ou `ObjectType` / `InterfaceType`)
Ceci va appliquer le middleware sur toutes les méthodes du resolver.
Les middlewares appliqués à `@Resolver` vont être exécutés avant les middlewares sur les méthodes de la class.
```ts
@Resolver()
@Middlewares(verifyArgs)
class Resolver {
  @Query()
  query(@Arg("count") count: number) {
    // ...
  }

  @Mutation()
  mutation(@Arg("count") count: number) {
    // ..
  }

  @Subscription({ subscribe: () => pubsub.asyncIterator("NOTIF") })
  subscription(@Arg("count") count: number) {
    // ..
  }
}
```

## Construction et utilisation d'un middleware basé sur une class
Cela peut être plus "propre" d'utiliser une classe pour déclarer un middleware plutôt qu'une fonction directement. Pour cela vous pouvez utiliser la class `Middleware` fournie par `graphql-composer-decorators`.

### 1. Déclaration
Déclarons la class
```ts
import { Context, Next } from "graphql-composer";
import { Middleware } from "graphql-composer-decorators";

class ArgsVerificator extends Middleware {
  async resolve(args, context: Context, next: Next) {
  }
}
```

### 2. Validation
Si la condition est remplie, il faudra dire à notre middleware qu'il peut passer au middleware suivant, ceci se fait avec le paramètre `next` qui est une fonction asynchrone à appeler.  
Si `next` n'est pas appelé, le middleware suivant n'est simplement pas exécuté.
> Si vous ne mettez pas d'`await` avant `next()` le middleware courant ne va pas attendre la fin de l'exécution du middleware suivant pour exécuter la suite de son code.
```ts
import { Context, Next } from "graphql-composer";
import { Middleware } from "graphql-composer-decorators";

class ArgsVerificator extends Middleware {
  async resolve(args, context: Context, next: Next) {
    if (args.count > 0) {
      await next();
    }
    throw new Error("Count must be greater than 0");
  }
}
```

### 3. Utilisation
Ils sont utilisables de la même façon qu'un middleware basé sur une fonction
Votre middleware peut être appliqué avec le décorateur `@Middlewares` à:
- Un **resolver**
- Un **ObjectType**
- Une **InterfaceType**
- Une **query**
- Une **mutation**
- Une **subscription**

#### Avec `@Query` ou `@Mutation` ou `@Subscription`
```ts
@Resolver()
class Resolver {
  @Query()
  @Middlewares(ArgsVerificator)
  query(@Arg("count") count: number) {
    // ...
  }

  @Mutation()
  @Middlewares(ArgsVerificator)
  mutation(@Arg("count") count: number) {
    // ..
  }

  @Subscription({ subscribe: () => pubsub.asyncIterator("NOTIF") })
  @Middlewares(ArgsVerificator)
  subscription(@Arg("count") count: number) {
    // ..
  }
}
```

#### Avec `@Resolver` (ou `ObjectType` / `InterfaceType`)
Ceci va appliquer le middleware sur toutes les méthodes du resolver.
Les middlewares appliqués à `@Resolver` vont être exécutés avant les middlewares sur les méthodes de la class.
```ts
@Resolver()
@Middlewares(ArgsVerificator)
class Resolver {
  @Query()
  query(@Arg("count") count: number) {
    // ...
  }

  @Mutation()
  mutation(@Arg("count") count: number) {
    // ..
  }

  @Subscription({ subscribe: () => pubsub.asyncIterator("NOTIF") })
  subscription(@Arg("count") count: number) {
    // ..
  }
}
```