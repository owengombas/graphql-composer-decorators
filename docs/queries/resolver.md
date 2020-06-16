# Resolver
A resolver is a class that hosts **query**, **mutation** or **subscription**.

## `@Query` and `@Mutation`
These two decorators work in the same way, except that one declares a field in your `Query` type and the other in your `Mutation` type.
The final result is that the `@Field` decorator declares a field in its respective type (`type Query` or `type Mutation`), it then accepts the same parameters as `@Field` ([details](/graphql-composer-decorators/types/field)).
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
Will give in SDL:
```graphql
type Query {
  queryMe: Response
}

type Mutation {
  mutateMe: Response
}
```

## Subscriptions
It's a bit different for a subscription, this one also works as `@Query` and `@Mutation`. Subscriptions will be added to the GraphQL type `Subscription`. However, it needs to indicate a subscribe function in its parameters.  

So you can choose the desired library for your subscriptions, here is an example with `graphql-subscriptions`.  

> When you use `PubSub.publish`, the value of the payload is injected into `Context.source`.
```ts
import { Context } from "graphql-composer";
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

@ObjectType()
class Response {
  // ...
} 

@Resolver()
class Resolver {
  Subscription({
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

For people familiar with how to do things with the `graphql` module, this would look like this:
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
Which gives in SDL:
```graphql
type Subscription {
  mySubscription: Response
}
```

## The `Context` object
The `Context<BodyType = any, SourceType = any>` object is injected after your arguments into a method, it contains all the information of the request:
| Property | Type | Description
|-|-|-|
| body | `BodyType (any)` | The response sent to the client |
| field | `Field` | Contains the reference to the `Field` object in `graphql-compose`, giving you access to all the information in the field |.
| context | `any` | The GraphQL context |
| info | `GraphQLResolveInfo` | GraphQL's info object |
| source | `SourceType (any)` | GraphQL source object, **the payload of a subscription** |
| rawArgs | `any` | arguments not converted to pending class, arguments as is |

## Return a result
You can return a result in two different ways:
- Using `return` (can be restrictive when using middleware with the `next` function)
- By assigning `Context.body` to a value

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
