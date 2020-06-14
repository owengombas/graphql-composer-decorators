import { ObjectType as ComposerObjectType } from "graphql-composer";
import { ObjectType, Field, Extensions, Schema } from "../../src";

@ObjectType()
@Extensions({ type: "user" })
class User {
  @Field()
  @Extensions({ field: "name" })
  name: string;
}

const schema = Schema.create().load();

describe("Extensions", () => {
  it("Should add the extensions", async () => {
    const user = schema.types[0] as ComposerObjectType;

    expect(user.extensions.type).toBe("user");
    expect(user.fields[0].extensions.field).toBe("name");
  });
});
