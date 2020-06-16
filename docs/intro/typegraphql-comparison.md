# Differences with TypeGraphQL
This framework is based on the same principle as TypeGraphQL, however it corrects and changes some operating modes which can sometimes be restrictive.

## API
The main change is that this module is split into two separate modules instead of one heavier one, which also provides you with a compositing API called `graphql-composer`.  

## Field decorators
There are also additional decorators such as `@ObjectField` `@InputField` and `@InterfaceField`, which allow you to set up a field for a certain GraphQL type of the `class`.  

## `ArgsType`
It does not have an `ArgsType`, as it does not exist in GraphQL. On the other hand, it is on the query argument declaration side that we will be able to use a whole **input** type to declare all the arguments with the `@Args` decorator (just like `ArgsType`):
```ts
@InputType() class User { @Field() username: string;

@Field()
email: string;
}

@Resolver() class Resolver { @Query() getUser( @Args() user: User ): Boolean.
```

which gives in SDL:
```graphql
input User {
  username: String
  email: String
}

type Query {
  getUser(username: String, email: String): Bool
}
```

## `Nullable` or `Required`
The definition of nullable and required types is very restrictive with TypeGraphQL, which has been set here using two functions: `Nullable(type: Type)` (`N(type: Type)`) and `Required(type: Type)` (`R(type: Type)`).
Let's take the example of declaring an array with required internal content (by being explicit, you can of course specify whether your types are null or required by default):
```ts
@InputType()
class User {
  @Field(type => [Required(String)])
  // or shorter with @Field(type => [R(String)])
  username: string[];

  @Field(type => Null([Required(String)])
  // or shorter with @Field(type => N([R(String)]))
  email: string[];
}
```
It is not possible to do this with TypeGraphQL at the moment, because the nullable parameter is applied to the set of `@Field`.

## Subscriptions
The `@Subscription` decorator works in a different way, not being satisfied with imposing `grahphql-subscriptions` as a subscription manager (so the way subscriptions work is not very free for the developer) and not leaving the choice to the developer, I opted for a slightly different way.
>Both choices are defensible, but I prefer to be free to manage my subscription mechanism via my application, and it doesn't add much complexity.

With `graphql-composer-decorators`
```ts
import { PubSub } from "graphql-subscriptions";

const pubsub = new PubSub();

@Resolver() class Resolver {
  Subscription({
    subscription: (args) => pubsub.asyncIterator("NOTIFICATION"),
  })
  mySubscription(): Boolean {
    // ...
  }

  @Query()
  trigger(): Boolean {
    pubsub.publish("NOTIFICATION");
    // ...
  }
}
```

With TypeGraphQL:
```ts
@Resolver()
class Resolver {
  Subscription({ topics: "NOTIFICATION" })
  mySubscription() {
    // ...
  }

  @Query()
  trigger(@PubSub() pubSub): Boolean {
    pubsub.publish("NOTIFICATION");
    // ...
  }
}
```

## The context
Arguments specific to the GraphQL context (info, source, root, etc...) are injected via decorators with TypeGraphQL (`@Root`, `@Source`, `@Infos`, ...) which can make the declaration of your methods pretty huge. Here we have opted to inject an object containing all this information after your arguments:
```ts
import { Context } from "graphql-composer";

@Resolver()
class Resolver {
  @Query()
  trigger(
    @Arg("username") username: string,
    context: Context, // Injected here (after all your arguments)   
  ): Boolean {
    // ...
  }
}
```