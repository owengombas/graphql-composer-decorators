import { ObjectType, Field, Schema } from "../../src";
import { UnionType, ObjectType as ComposerObjectType } from "graphql-composer";

@ObjectType()
class Cat {}

@ObjectType()
class Cow {}

const union = UnionType.create("CatOrCow", Cat, Cow);

@ObjectType()
class User {
  @Field(() => union)
  animal: Cat | Cow;

  @Field(() => union)
  animal2: Cat | Cow;
}

const schema = Schema.create().load();

describe("UnionType", () => {
  it("Should create an union type with classes", async () => {
    const user = schema.types[3] as ComposerObjectType;

    expect(user.fields[0].type).toEqual(union);
    expect(user.fields[1].type).toEqual(union);
  });
});
