# Description
You can assign a deprecation reason with parameters via all GraphQL field decorators (`@Field`, `@InputField`, ...). However, if you want to add a common deprecation reason for all types, or all fields, it is more convenient to go to `@Deprecated`.  

## Using `@Deprecated`
User type and UserInput will have the same reason for deprecation:
```ts
@Deprecated("Type deprecated")
@ObjectType()
@InputType("UserInput")
class User {
  @Description("Field deprecated")
  @ObjectField()
  @InputField()
  username: string;
}
```

## Use of deprecation in a distinct way
This is done via the parameters of the element decorators
```ts
ObjectType({ deprecationReason: "User object deprecated" })
@InputType("UserInput", { deprecationReason: "User input deprecated" })
class User {
  ObjectField({ deprecationReason: "User object field deprecated" })
  InputField({ deprecationReason: "User input field deprecated" })
  username: string;
}
```
