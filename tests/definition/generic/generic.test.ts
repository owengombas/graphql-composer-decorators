import { ObjectType, Field, Schema } from "../../../src";
import { ClassType, ObjectType as ComposerObjectType } from "graphql-composer";

@ObjectType({ hidden: true })
abstract class Args<ArgsType> {
  @Field()
  count: number;
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
    const user = schema.types[0] as ComposerObjectType;
    const userArgs = schema.types[1] as ComposerObjectType;
    const generic = schema.types[2] as ComposerObjectType;

    expect(schema.types).toHaveLength(3);

    expect(user.name).toEqual("User");
    expect(userArgs.name).toEqual("UserArgs");
    expect(generic.name).toEqual("Generic");

    expect(userArgs.fields[0].type).toEqual(user);
    expect(userArgs.fields[1].type).toEqual(Number);

    expect(generic.fields[0].type).toEqual(userArgs);
  });
});
