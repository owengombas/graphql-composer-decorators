# `ObjectType`
**An `ObjectType` corresponds to the declaration: `type` with GraphQL (in SDL)**.
```ts
@ObjectType()
class User {
  @Field()
  email: string;

  @Field()
  username: string;
}
```

Will give in SDL:
```graphql
type User {
  email: String
  username: String
}
```

## Parameters
`@ObjectType` has several signatures available for setting up your object:

### `name`
Indicates the name of the type compiled in SDL.
```ts
@ObjectType("UserType")
class User {
  Field()
  username: string;
}
```

Will give in SDL:
```graphql
UserType {
  username: String;
}
```

### `params`
An object accepting several parameters:
| Property | description | type |
|-|-|-|
| hidden | The class will not be compiled and will not appear in the schema (useful for generic types), an abstract class is normally `hidden` | `boolean` |
| nullable | All fields of type will be nullable | `boolean` |
| required | All fields of the type will be required | `boolean` |
| implements an interface (GraphQL) | `(ClassType | InterfaceType)[]` (*A class* or *a declared interface with `graphql-composer`*)[] |
| description | The description of the type | `string` |
| extensions | Extensions (metadata) of the type | `any` |
| directives | directives of the type | `{name: string, args: KeyValue}[]` |
| extends | Apply forced inheritance | `(ClassType | ObjectType | InterfaceType | InputType)[]` (*A class* or *a type declared with `graphql-composer`*)[] |

## `@ObjectField`
The `@ObjectField` decorator will show field parameters only for `@ObjectType`.  

This is useful when you use a class as several GraphQL types (``type`, `input` and/or `interface`), decorating it simultaneously with `@ObjectType` and `@InputType` for example.  

Because `@Field` sets the field for all GraphQL types whose class is decorated.
> `@ObjectField` overrides the parameters of `@Field`.
```ts
@ObjectType()
@InputType("UserInput")
class User {
  @Field(type => R(String))
  @ObjectField()
  username: string;

  @InputField(type => R(String))
  @ObjectField()
  name: string;

  @Field()
  email: string;

  @InputField()
  password: string;
}
```

Will give in SDL:
```graphql
type User {
  username: String;
  name: String;
  email: Thong;
}

input UserInput {
  username: String!;
  name: String!;
  email: Thong;
  password: String;
}
```

## Resolvable field
With GraphQL a field of a type can accept arguments and a function returning a value.
Like this guy, for example:
```graphql
type User {
  birthdate(format: String!): Thong!
}
```
To do this, simply implement a method decorated with `@Field` in your class.
```ts
@ObjectType()
class User {
  @Field()
  // or @ObjectField()
  birthDate(@Arg("birthdate") birthdate: string): string {
    // ...
  }
}
```

## The middlewares
The [use of middlewares](/graphql-composer-decorators/queries/middlewares) on the whole class and on the fields is possible.
