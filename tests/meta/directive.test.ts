import {
  ObjectType as ComposerObjectType,
  Directive as ComposerDirective,
  InputType as ComposerInputType,
} from "graphql-composer";
import {
  ObjectType,
  Schema,
  Directive,
  InputType,
  ObjectField,
  InputField,
} from "../../src";

@ObjectType()
@InputType()
@Directive("deprecated", { reason: "type" })
class User {
  @ObjectField()
  @InputField()
  @Directive("deprecated", { reason: "field" })
  @Directive("upper")
  name: string;
}

const schema = Schema.create().load();

describe("Directive", () => {
  it("Should add the directive", async () => {
    const user = schema.types[0] as ComposerObjectType;
    const userInput = schema.types[1] as ComposerInputType;

    expect(user.directives).toEqual([
      ComposerDirective.create("deprecated").addArg("reason", "type"),
    ]);
    expect(user.fields[0].directives).toEqual([
      ComposerDirective.create("upper"),
      ComposerDirective.create("deprecated").addArg("reason", "field"),
    ]);

    expect(userInput.directives).toEqual([
      ComposerDirective.create("deprecated").addArg("reason", "type"),
    ]);
    expect(userInput.fields[0].directives).toEqual([
      ComposerDirective.create("upper"),
      ComposerDirective.create("deprecated").addArg("reason", "field"),
    ]);
  });
});
