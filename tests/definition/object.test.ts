import {
  Schema,
  Field,
  ObjectType,
  Middlewares,
  Deprecated,
  Extensions,
  Description,
} from "../../src";
import {
  N,
  ObjectType as ComposerObjectType,
  Directive,
} from "graphql-composer";

@ObjectType({ nullable: true })
class TestObject1 {
  @Field({
    extensions: { test: "test" },
    deprecationReason: "deprecated",
    description: "description",
    directives: [{ name: "upper", args: { arg: "arg" } }],
  })
  testField1: String;
}

@ObjectType()
class TestObject2 extends TestObject1 {
  @Field(() => [TestObject1])
  testField2: TestObject1[];
}

const mw1 = () => {};
const mw2 = () => {};

@ObjectType()
@Middlewares(mw1)
class TestObject3 extends TestObject2 {
  @Field(() => N(String))
  @Description("inherited")
  testField1: String;

  @Field(() => N([N(TestObject1)]))
  testField3?: TestObject1[];

  @Field()
  @Middlewares(mw2, mw1)
  resolvable(): TestObject1 {
    return;
  }
}

const schema = Schema.create()
  .setConfig({
    requiredByDefault: true,
  })
  .load();

describe("Object type", () => {
  it("Should create an object type", async () => {
    const testObject1 = schema.types[0] as ComposerObjectType;
    const testObject2 = schema.types[1] as ComposerObjectType;
    const testObject3 = schema.types[2] as ComposerObjectType;

    expect(testObject1.name).toBe("TestObject1");
    expect(testObject2.name).toBe("TestObject2");
    expect(testObject3.name).toBe("TestObject3");

    expect(testObject1.fields[0].name).toBe("testField1");
    expect(testObject1.fields[0].description).toBe("description");
    expect(testObject1.fields[0].deprecationReason).toBe("deprecated");
    expect(testObject1.fields[0].extensions.test).toBe("test");
    expect(testObject1.fields[0].directives).toEqual([
      Directive.create("upper").addArg("arg", "arg"),
    ]);
    expect(testObject1.fields[0].type).toEqual(N(String));

    expect(testObject2.fields[0].name).toBe("testField2");
    expect(testObject2.fields[0].type).toEqual([testObject1]);
    expect(testObject2.fields[1].name).toBe("testField1");
    expect(testObject2.fields[1].type).toEqual(N(String));

    expect(testObject3.fields[0].name).toBe("testField1");
    expect(testObject3.fields[0].description).toBe("inherited");
    expect(testObject3.fields[0].type).toEqual(N(String));
    expect(testObject3.fields[1].name).toBe("testField3");
    expect(testObject3.fields[1].type).toEqual(N([N(testObject1)]));
    expect(testObject3.fields[2].name).toBe("resolvable");
    expect(testObject3.fields[2].resolver).toBeDefined();
    expect(testObject3.fields[2].middlewares).toEqual([mw1, mw2, mw1]);
    expect(testObject3.fields[2].type).toEqual(testObject1);
    expect(testObject3.fields[3].name).toBe("testField2");
    expect(testObject3.fields[3].type).toEqual([testObject1]);
  });
});
