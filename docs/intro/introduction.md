# Introduction
GraphQL est revolutionizes backend development, the fact that you have to declare types is something very useful.  

However, this can lead to duplication of code and therefore affect the stability of your application. Indeed, based on the DRY (Don't Repeat Yourself) principle, the fact of declaring several times the same element in a different way should be avoided, because when this element changes you have to modify several parts of code, so if only one of these parts is omitted it can cause problems in your application and the more your application grows the harder it will be to maintain it.

## But TypeGraphQL already exists?
`graphql-composer-decorators` differs somewhat from TypeGraphQL the differences are detailed [here](/intro/typegraphql-comparison).

## Decorator's operation

### Type Inference

#### Explain the type
A decorator can determine a type only if it's explicitly written: **this won't work:** 
```ts
@ObjectType()
class User {
  @Field()
  username = "";
}
```
But this does:
```ts
@ObjectType()
class User {
  @Field()
  username: string;
}
```

#### Table
A decorator cannot determine the type of an array.
**This won't work**
```ts
@ObjectType()
class User {
  @Field()
  username: string[];
}
```
You must then indicate the type using the decorator with a similar syntax:
> You must use `String` (with a capital letter), because it is a class, whereas `string` is a type and therefore cannot be passed as a parameter.
```ts
@ObjectType()
class User {
  @Field(type => [String])
  username: string[];
}
```

#### Generic types
A decorator, like for arrays (in the end it's the same, because `type[]` is equivalent to `Array<type>`), cannot determine the type passed as a parameter of a generic type.
**This won't work**
```ts
@ObjectType()
class User {
  @Field()
  sponsor: Partial<MyOtherType>;
}
```
You must then create a type that is equivalent to `Partial<MyOtherType>`.
> There are several ways to proceed, this is a simple case. But the principle remains the same no matter how.
```ts
ObjectType({null: true })
class MyOtherType {
  // ...
}

@ObjectType()
class User {
  @Field(type => MyOtherType)
  sponsor: Partial<MyOtherType>;
}
```
