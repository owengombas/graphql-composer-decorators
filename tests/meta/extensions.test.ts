import {
  ObjectType as ComposerObjectType,
  InputType as ComposerInputType,
} from "graphql-composer";
import {
  ObjectType,
  Field,
  Extensions,
  Schema,
  InputType,
  InputField,
  ObjectField,
} from "../../src";

@ObjectType()
@InputType("userInput")
@Extensions({ type: "user" })
class User {
  @ObjectField()
  @InputField()
  @Extensions({ field: "name" })
  name: string;
}

const schema = Schema.create().load();

describe("Extensions", () => {
  it("Should add the extensions", async () => {
    const user = schema.types[0] as ComposerObjectType;
    const userInput = schema.types[1] as ComposerInputType;

    expect(user.extensions.type).toBe("user");
    expect(user.fields[0].extensions.field).toBe("name");

    expect(userInput.extensions.type).toBe("user");
    expect(userInput.fields[0].extensions.field).toBe("name");
  });
});
