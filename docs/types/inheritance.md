# Inheritance
Inheritance is naturally supported by `graphql-composer-decorators`, when you use the keyword `extends`, it will determine the type of the inherited class and get its GraphQL type and add the fields to the inherited type.

> Inheritance is not natively supported by GraphQL, `graphql-composer-decorators` then takes care of copying the fields.

## Example of inheritance
Both classes must be decorated with the same GraphQL type in order to use inheritance (here `@ObjectType` and `@InputType`).
```ts
@ObjectType()
@InputType("AnimalInput")
class Animal {
  @Field()
  name: string;
}

@ObjectType()
@InputType("CatInput")
class Cat extends Animal {
  @Field()
  meow: thong;
}
```

Will give in SDL:
```graphql
type Animal {
  name: String
}

type Cat {
  name: String
  meow: Thong
}

input AnimalInput {
  name: String
}

input CatInput {
  name: String
  meow: Thong
}
```
