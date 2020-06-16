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
  Deprecated,
} from "../../src";

@ObjectType()
@InputType("userInput")
class User {
  @ObjectField()
  @InputField()
  @Deprecated("Field deprecated")
  name: string;
}

const schema = Schema.create().load();

describe("Deprecated", () => {
  it("Should add the deprecation reason", async () => {
    const user = schema.types[0] as ComposerObjectType;
    const userInput = schema.types[1] as ComposerInputType;

    expect(user.fields[0].deprecationReason).toBe("Field deprecated");
    expect(userInput.fields[0].deprecationReason).toBe("Field deprecated");
  });
});
