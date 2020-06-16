# Middlewares
Middlewares are very common in backend development, they allow you to avoid repetition, to clarify your code and to better organize it.
The system used by this module is based on [`koa`](https://koajs.com/) middleware.

## Building and using function-based middleware
A middleware is a function that is executed before the main function of a request. For example, it can be used to verify that a user is authenticated.  
Here we will create a middleware that checks the value of an argument.

### 1. Declaration
Let's declare the function
```ts
import { Context, Next } from "graphql-compose";

async function verifiyArgs(args, context: Context, next: Next) {
}
```

### 2. Validation
If the condition is met, we will have to tell our middleware that it can go to the next middleware, this is done with the parameter `next` which is an asynchronous function to call.  
If `next` is not called, the next middleware is simply not executed.
> If you don't put `await` before `next()`, the current middleware will not wait until the next middleware has finished executing to execute the rest of its code.
```ts
import { Context, Next } from "graphql-compose";

async function verifiyArgs(args, context: Context, next: Next) {
  if (args.count > 0) {
    await next();
  }
  throw new Error ("Count must be greater than 0");
}
```

### 3. Use
Your middleware can be applied with the `@Middlewares` decorator at:
- A **resolver**
- An **ObjectType**
- An **InterfaceType**
- A **query**
- A **mutation**
- A **subscription**

#### With `@Query` or `@Mutation` or `@Subscription`
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

  @Subscribe({ subscribe: () => pubsub.asyncIterator("NOTIFICATION") })
  @Middlewares(verifyArgs)
  subscription(@Arg("count") count: number) {
    // ..
  }
}
```

#### With `@Resolver` (or `ObjectType` / `InterfaceType`)
This will apply the middleware to all methods of the resolver.
The middlewares applied to `@Resolver` will be executed before the middlewares on the methods of the class.
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

  @Subscribe({ subscribe: () => pubsub.asyncIterator("NOTIFICATION") })
  subscription(@Arg("count") count: number) {
    // ..
  }
}
```

## Building and using class based middleware
It may be "cleaner" to use a class to declare middleware rather than a function directly. For this you can use the `Middleware` class provided by `graphql-composer-decorators`.

### 1. Declaration
Let's declare the class
```ts
import { Context, Next } from "graphql-compose";
import { Middleware } from "graphql-composer-decorators";

class ArgsVerificator extends Middleware {
  async resolve(args, context: Context, next: Next) {
  }
}
```

### 2. Validation
If the condition is met, we will have to tell our middleware that it can go to the next middleware, this is done with the parameter `next` which is an asynchronous function to call.  
If `next` is not called, the next middleware is simply not executed.
> If you don't put `await` before `next()`, the current middleware will not wait until the next middleware has finished executing to execute the rest of its code.
```ts
import { Context, Next } from "graphql-compose";
import { Middleware } from "graphql-composer-decorators";

class ArgsVerificator extends Middleware {
  async resolve(args, context: Context, next: Next) {
    if (args.count > 0) {
      await next();
    }
    throw new Error ("Count must be greater than 0");
  }
}
```

### 3. Use
They can be used in the same way as a middleware based on a function
Your middleware can be applied with the `@Middlewares` decorator at:
- A **resolver**
- An **ObjectType**
- An **InterfaceType**
- A **query**
- A **mutation**
- A **subscription**

#### With `@Query` or `@Mutation` or `@Subscription`
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

  @Subscribe({ subscribe: () => pubsub.asyncIterator("NOTIFICATION") })
  @Middlewares(ArgsVerificator)
  subscription(@Arg("count") count: number) {
    // ..
  }
}
```

#### With `@Resolver` (or `ObjectType` / `InterfaceType`)
This will apply the middleware to all methods of the resolver.
The middlewares applied to `@Resolver` will be executed before the middlewares on the methods of the class.
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

  @Subscribe({ subscribe: () => pubsub.asyncIterator("NOTIFICATION") })
  subscription(@Arg("count") count: number) {
    // ..
  }
}
```
