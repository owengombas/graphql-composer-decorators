import { ObjectType, Field, Schema } from "../../src";
import { ObjectType as ComposerObjectType, EnumType } from "graphql-composer";

enum Animal {
  CAT = 1,
  DOG = 2,
}

const animalEnum = EnumType.create("CatOrCow", Animal);

@ObjectType()
class User {
  @Field(() => animalEnum)
  animal: Animal;
}

const schema = Schema.create().load();

describe("UnionType", () => {
  it("Should create an union type with classes", async () => {
    const user = schema.types[1] as ComposerObjectType;

    expect(user.fields[0].type).toEqual(animalEnum);
  });
});
