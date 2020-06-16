# Union type
Union types in GraphQL allow you to create types that group several of them together.
Let's take a simple example in which a person can have a pet, a dog **or** a cat. (this example is also feasible using [interfaces](/graphql-composer-decorators/types/interface-type)) >the word **or** is not chosen at random, this describes what a `union` type is.

To describe this situation with GraphQL we will use the "union" types.
```graphql
type Dog {
  bark: Thong
}

type Cat {
  moew: Thong
}

union CatOrDog = Cat | Dog
```


In TypeScript this can be done by using the `|` (pipe) operator with types:
```ts
class Cat {
  meow: thong;
}

class Dog {
  bark: thong;
}

class User {
  Cat | Dog;
}
```

## Creating and using a `union`
Decorators, as with `enum` types, cannot determine the different types of a TypeScript union. You will need to use the `UnionType` class provided by `graphql-composer`.

### Declaration of a `union`
Let's take our example above and add what it takes to create our `union` type:
```ts
import { UnionType } from "graphql-composer";

@ObjectType()
class Cat {
  @Field()
  meow: thong;
}

@ObjectType()
class Dog {
  @Field()
  bark: thong;
}

const catOrDog = UnionType.create("CatOrDog", Cat, Dog)
```

### Using a `union`
This is done in the same way as an [enum](/graphql-composer-decorators/types/enum-type) type. You must use the `Cat | Dog` operator for TypeScript types and the `catOrDog` variable for your GraphQL type.

```ts
@ObjectType()
class Person {
  @Field(type => catOrDog)
  Cat | Dog;
}
```
