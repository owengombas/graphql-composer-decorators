import { ObjectType as ComposerObjectType } from "graphql-composer";
import { ObjectType, Field, Schema, Description } from "../../src";

@ObjectType()
@Description("My user type")
class User {
  @Field()
  @Description("My user field")
  name: string;
}

const schema = Schema.create().load();

describe("Description", () => {
  it("Should add the description", async () => {
    const user = schema.types[0] as ComposerObjectType;

    expect(user.description).toEqual("My user type");
    expect(user.fields[0].description).toEqual("My user field");
  });
});
