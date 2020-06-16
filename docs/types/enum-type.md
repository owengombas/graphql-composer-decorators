# Enum type
There are `enum` types in GraphQL, however these do not support decorators with TypeScript. This implies that you have to use an alternative way of declaring them to `graphql-compose`.

## The creator of `EnumType`
Using the `EnumType` class provided by `graphql-composer` you can create a GraphQL `enum` type by passing your `enum` TypeScript as a parameter.  

### Type declaration
In the first parameter you have to give the name of the GraphQL type and in the second the enum.

```ts
import { EnumType } from "graphql-compose";

enum Animal {
  CAT = 1,
  COW = 2,
}

const animalEnum = EnumType.create("AnimalEnum", Animal)
```

### Use of type
To type your TypeScript class fields you'll use `Animal` and for GraphQL fields it will be the variable `animalEnum` that will be used.

```ts
@ObjectType()
class User {
  @Field(type => animalEnum)
  pet: Animal
}
```