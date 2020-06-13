import {
  ObjectType as ComposerObjectType,
  Directive as ComposerDirective,
} from "graphql-composer";
import { ObjectType, Field, Extensions, Schema, Directive } from "../../src";

@ObjectType()
@Directive("deprecated", { reason: "type" })
class User {
  @Field()
  @Directive("deprecated", { reason: "field" })
  @Directive("upper")
  name: string;
}

const schema = Schema.create().load();

describe("Directive", () => {
  it("Should add the directive", async () => {
    const user = schema.types[1] as ComposerObjectType;

    expect(user.directives).toEqual([
      ComposerDirective.create("deprecated").addArg("reason", "type"),
    ]);
    expect(user.fields[0].directives).toEqual([
      ComposerDirective.create("upper"),
      ComposerDirective.create("deprecated").addArg("reason", "field"),
    ]);
  });
});
