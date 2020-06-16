# Generic types
It will certainly be very useful in your application to use generic types.
Let's take the example of a list response to a request in which you send all items via a list of the type of the item (`items`) and the size of the list (`count`).  
*In the form of class:*
```ts
class Response<Type> {
  items: Type;
  count: Number;
}
```

To do this with decorators we have to use an unusual method: a function returning a class!

## Process of creating a generic type

### Base class declaration
Only the number field is decorated, because the items do not have a type at this time.
> The class is hidden because it serves as a template for the types that will be created from it.  
```ts
ObjectType({ hidden: true })
abstract class GenericResponse<Type> {
  @Field()
  count: Number;
  items: Type[];
}
```

### Type creator declaration
You will need to use the **value** of the class passed as a parameter to the `@Field` decorator and the **type** passed as a generic parameter to the function to declare the type of the class field.
```ts
import { ClassType } from "graphql-composer";

function createResponse<ItemsType extends ClassType>(itemsType: ItemsType) {
  @ObjectType()
  class Response extends GenericResponse<ItemsType> {
    @Field(type => [itemsType])
    items: ItemsType[]
  }

  return Response as ClassType;
}
```

Finally, that how to use our generic type:
```ts
@ObjectType()
class User {
  @Field()
  username: string;

  @Field()
  email: string;
}

const userResponse = createResponse(User);

@Resolver()
class R {
  @Query(type => userResponse)
  query(): GenericResponse<User> {
    // ...
  }
}
```
