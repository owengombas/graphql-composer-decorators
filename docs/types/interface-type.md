# `InterfaceType`
**A `InterfaceType` corresponds to the statement: `interface` with GraphQL (in SDL)**.
```ts
@InterfaceType()
class User {
  @Field()
  email: string;

  @Field()
  username: string;
}
```
Will give in SDL:
```graphql
User interface {
  email: String
  username: String
}
```

## Parameters
`@InterfaceType` has several signatures available for setting up your object:

### `name`
Indicates the name of the type compiled in SDL.

### `params`
An object accepting several parameters:
| Property | description | type |
|-|-|-|
| hidden | The class will not be compiled and will not appear in the schema (useful for generic types), an abstract class is normally `hidden` | `boolean` |
| nullable | All fields of type will be nullable | `boolean` |
| required | All fields of the type will be required | `boolean` |
| typeResolver | Function determining the value of `__typename` | `GraphQLTypeResolver` |
| description | The description of the type | `string` |
| extensions | Extensions (metadata) of the type | `any` |
| directives | directives of the type | `{name: string, args: KeyValue}[]` |
| extends | Apply forced inheritance | `(ClassType | ObjectType | InterfaceType | InputType)[]` (*A class* or *a type declared with `graphql-composer`*)[] |

## `@InterfaceField`
The `@InterfaceField` decorator will show field parameters only for `@InterfaceType`.  

This is useful when you use a class as several GraphQL types (``type`, `input` and/or `interface`), decorating it simultaneously with `@InterfaceType` and `@InputType` for example.  

Because `@Field` sets the field for all GraphQL types whose class is decorated.
> `@InterfaceField` overrides the parameters of `@Field`.
```ts
@InterfaceField()
@InputType("UserInput")
class User {
  @Field(type => R(String))
  @InterfaceField()
  username: string;

  @InputField(type => R(String))
  @InterfaceField()
  name: string;

  @Field()
  email: string;

  @InputField()
  password: string;
}
```

Will give in SDL:
```graphql
User interface {
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

## The function of `TypeResolver` (`__typename`)
By default a function that works with all types is written by `graphql-composer`, so in many cases you don't need to give a value to `params.typeResolver`.
> The default function determines the type via the object properties, but generally for any object. This also applies to `UnionType'.
A `GraphQLTypeResolver` function may look like this (in one specific case):
```ts
function typeResolver = (obj, context, info) => {
  if(obj.name){
    return "Author";
  }

  if(obj.title){
    return "Book";
  }

  return null;
}

@InterfaceType({
  typeResolver
})
class User {
  Field()
  username: string;
}
```
