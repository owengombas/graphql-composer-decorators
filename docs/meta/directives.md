# Extensions
GraphQL does not deal with a specific strategy for implementing directives, it is up to each GraphQL server implementation to expose an API for implementing new directives.
[Documentation on directives with Apollo](https://www.apollographql.com/docs/apollo-server/schema/creating-directives/)

You can assign `directives` with parameters via all GraphQL element decorators (`@ObjectType`, `@InputType`, `@InterfaceType` `@Arg`, `@Field`, ...). However, if you want to assign `directives` commonly for all types, or all fields, it is more convenient to use `@Directive`.  

## Use of `@Directive`
This is done simply by passing a name and arguments (optional) to the `@Directive` decorator.
> If you want to put multiple directives on an element, you'll need to use the decorator multiple times
```ts
@ObjectType()
@InputType()
@Directive( upper)
@Directive("test", { class: "User" })
class User {
  @ObjectField()
  @InputField()
  @Directive( upper)
  username: string;
}
```

## Use of directives separately
This is done via the parameters of the element decorators:
```ts
ObjectType({
  guidelines: [
    { name: "upper" }
  ]
})
InputType({
  guidelines: [
    {
      name: "upper",
      args: { class: "input-User" }
    }
  ]
})
class User {
  ObjectField({
    guidelines: [
      { name: "upper-object" }
    ]
  })
  InputField({
    guidelines: [
      { name: "upper-input" }
    ]
  })
  username: string;
}
```
