# Description
You can assign a description using parameters via all GraphQL element decorators (`@ObjectType`, `@InputType`, `@InterfaceType` `@Arg`, `@Field`, ...). However, if you want to add a common description for all types, or all fields, it is more convenient to go to `@Description`.  

## GraphQL description
Your GraphQL elements (type, input, interface, fields, etc...) can have a description:
```graphql
"My User type"
type User {
  "His username."
  username: String
}
```

## Use of `@Description`
Type User and Input UserInput will have the same description:
```ts
@Description("An user")
@ObjectType()
@InputType("UserInput")
class User {
  @Description( The username )
  @ObjectField()
  @InputField()
  username: string;
}
```

Will give in SDL:
```graphql
"An user"
type User {
  "The username."
  username: String;
}

"An user"
input UserInput {
  "The username."
  username: String;
}
```

## Use of description separately
This is done via the parameters of the element decorators
```ts
ObjectType({ description: "User object" })
@InputType("UserInput", { description: "User input" })
class User {
  ObjectField({ description: "User object field" })
  @InputField({ description: "User input field" })
  username: string;
}
```

Will give in SDL:
```graphql
"User object"
type User {
  "User object field"
  username: String;
}

"User input"
input UserInput {
  "User input field"
  username: String;
}
```
