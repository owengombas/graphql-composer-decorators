import {
  ObjectType as ComposerObjectType,
  InputType as ComposerInputType,
} from "graphql-composer";
import {
  ObjectType,
  Field,
  Schema,
  Description,
  InputType,
  InputField,
  ObjectField,
} from "../../src";

@ObjectType()
@InputType()
@Description("My user type")
class User {
  @ObjectField()
  @InputField()
  @Description("My user field")
  name: string;
}

const schema = Schema.create().load();

describe("Description", () => {
  it("Should add the description", async () => {
    const user = schema.types[0] as ComposerObjectType;
    const userInput = schema.types[1] as ComposerInputType;

    expect(user.description).toEqual("My user type");
    expect(user.fields[0].description).toEqual("My user field");

    expect(userInput.description).toEqual("My user type");
    expect(userInput.fields[0].description).toEqual("My user field");
  });
});
