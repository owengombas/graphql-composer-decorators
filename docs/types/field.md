# Field

## `@Field`
This decorator describes a field for all GraphQL types (`interface`, `input`, or `type`).
```ts
@ObjectType()
@InputType("InputInterface")
@InterfaceType("UserInterface")
class User {
  @Field()
  username: string;
}
```
Would give in SDL:
```graphql
type User {
  username: string;
}

UserInterface {
  username: string;
}

input UserInput {
  username: string;
}
```

## `@ObjectField`
Works exactly like `@Field` except that it only sets the `@ObjectType` field.  
Its operation is detailed on the [page dedicated to ObjectType](/types/object-type#objectfield).
```ts
@ObjectType()
@InputType("InputInterface")
@InterfaceType("UserInterface")
class User {
  @ObjectField()
  username: string;
}
```
Would give in SDL:
```graphql
type User {
  username: string;
}

UserInterface {
}

input UserInput {
}
```

## `@InterfaceField`
Works exactly like `@Field` except that it only sets the `@InterfaceType` field.  
Its operation is detailed on the [page dedicated to InterfaceType](/types/interface-type#interfacefield).
```ts
@ObjectType()
@InputType("InputInterface")
@InterfaceType("UserInterface")
class User {
  @InputField()
  username: string;
}
```
Would give in SDL:
```graphql
type User {
}

UserInterface {
  username: string;
}

input UserInput {
}
```

## `@InputField`
Works exactly like `@Field` except that it only sets the `@InputType` field.  
Its operation is detailed on the [page dedicated to InputType](/types/input-type#inputfield).
```ts
@ObjectType()
@InputType("InputInterface")
@InterfaceType("UserInterface")
class User {
  @InputField()
  username: string;
}
```

Would give in SDL:
```graphql
type User {
}

UserInterface {
}

input UserInput {
  username: string;
}
```

## Field parameters
Field decorators all have the same signatures:
- `@Field`
- `@ObjectField`
- `@InputField`
- `@InterfaceField`
- `@Query`
- `@Mutation`
- `@Subscribe` (`params.subscribe` required)

### `name`
You can change the name of the GraphQL field with this parameter.
```ts
@ObjectType()
class User {
  @Field("userUsername")
  username: string;
}
```
Will give in SDL:
```graphql
type User {
  userUsername: String
}
```

### `type`
This parameter overrides the limitations of TypeScript.  
It is necessary when the type cannot be inferred as with:
- Circular dependencies (A depends on B and B depends on A)
- Tables ([details](/#table))
- Generic types ([details](#generic types))
- Types that differ from the inferred type (such as [enum](/types/enum-type) or [union](/types/union-type))
- For a nullable or required field

```ts
@ObjectType()
class User {
  @Field(type => [String])
  username: string[];
}
```
