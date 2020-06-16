# Extensions
Extensions allow you to link data to your GraphQL elements (type, input, interface, fields, etc...).

This can be very useful in some cases, if you want to create a CMS for example, it might require having metadata on your fields.

You can assign `extensions` with parameters via all GraphQL element decorators (`@ObjectType`, `@InputType`, `@InterfaceType` `@Arg`, `@Field`, ...). However, if you want to assign `extensions` commonly for all types, or all fields, it is more convenient to use `@Extensions`.  

## Using `@Extensions`
This is done simply by passing an object to the `@Extensions` decorator.
```ts
@ObjectType()
@InputType()
Extensions({type: "class" })
class User {
  @ObjectField()
  @InputField()
  Extensions({type: "short-text" })
  username: string;
}
```

## Using extensions separately
This is done via the parameters of the element decorators:
```ts
ObjectType({ type: "object-class" })
@InputType({ type: "input-class" })
class User {
  ObjectField({ type: "object-short-text" })
  @InputField({ type: "input-short-text" })
  username: string;
}
```
