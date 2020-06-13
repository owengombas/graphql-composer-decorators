import { ObjectType, Field, Schema } from "../../../src";
import { ClassType, ObjectType as ComposerObjectType } from "graphql-composer";

abstract class Args<ArgsType> {
  items: ArgsType;
}

function args<T extends ClassType>(classType: T) {
  @ObjectType(`${classType.name}Args`)
  abstract class GenericArgs extends Args<T> {
    @Field(() => classType)
    items: T;
  }

  return GenericArgs as ClassType;
}

@ObjectType()
class User {
  @Field()
  username: string;
}

const userResponse = args(User);

@ObjectType()
class Generic {
  @Field(() => userResponse)
  generic: Args<User>;
}

const schema = Schema.create().load();

describe("Generic type", () => {
  it("Should create a generic type using the function pattern", async () => {
    const user = schema.types[1] as ComposerObjectType;
    const userArgs = schema.types[2] as ComposerObjectType;
    const generic = schema.types[3] as ComposerObjectType;

    expect(user.name).toEqual("User");
    expect(userArgs.name).toEqual("UserArgs");
    expect(generic.name).toEqual("Generic");

    expect(userArgs.fields[0].type).toEqual(user);
    expect(generic.fields[0].type).toEqual(userArgs);
  });
});
