# `InputType`
**An `InputType` corresponds to the declaration: `input` with GraphQL (in SDL)**.
```ts
@InputType()
class User {
  @Field()
  email: string;

  @Field()
  username: string;
}
```
Will give in SDL:
```graphql
input User {
  email: String
  username: String
}
```

## Parameters
`@InputType` has several signatures available for setting up your object:

### `name`
Indicates the name of the type compiled in SDL.

### `params`
An object accepting several parameters:
| Property | description | type |
|-|-|-|
| hidden | The class will not be compiled and will not appear in the schema (useful for generic types), an abstract class is normally `hidden` | `boolean` |
| nullable | All fields of type will be nullable | `boolean` |
| required | All fields of the type will be required | `boolean` |
| description | The description of the type | `string` |
| extensions | Extensions (metadata) of the type | `any` |
| directives | directives of the type | `{name: string, args: KeyValue}[]` |
| extends | Apply forced inheritance | `(ClassType | ObjectType | InterfaceType | InputType)[]` (*A class* or *a type declared with `graphql-composer`*)[] |

## `@InputField`
The `@InputField` decorator will show field parameters only for `@InputType`.  

This is useful when you use a class as several GraphQL types (``type`, `input` and/or `interface`), decorating it simultaneously with `@ObjectType` and `@InputType` for example.  

Because `@Field` sets the field for all GraphQL types whose class is decorated.
> `@InputField` overrides the `@Field` parameters.
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


## Use with `@Args` (and `@Arg`)
There are two ways to use your type as an argument:

### With `@Arg`
Works the same with all types
```ts
@Resolver()
class Resolver {
  @Query()
  user(@Arg("user") user: User): Boolean {
    // ...
  }
}
```
Will give in SDL:  
```graphql
input User {
  email: String
  username: String
}

input Query {
  user(user: User): Boolean
}
```

### With `@Args`
It is also very useful to be able to use a class to declare all arguments at once (lay the arguments flat) with `@Args`.
> Works only with `InputType`.
```ts
@Resolver()
class Resolver {
  @Query()
  user(@Args() user: User): Boolean {
    // ...
  }
}
```
Will give in SDL:  
```graphql
input User {
  email: String
  username: String
}

input Query {
  user(email: String, username: String): Boolean
}
```
