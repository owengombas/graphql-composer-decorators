import {
  Schema,
  Field,
  ObjectType,
  Middlewares,
  Description,
  Middleware,
  MetadataStorage,
} from "../../src";
import {
  N,
  ObjectType as ComposerObjectType,
  Directive,
} from "graphql-composer";

class MW1 extends Middleware {
  resolve() {}
}

class MW2 extends Middleware {
  resolve() {}
}

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

@ObjectType()
@Middlewares(MW1)
class TestObject3 extends TestObject2 {
  @Field(() => N(String))
  @Description("inherited")
  testField1: String;

  @Field(() => N([N(TestObject1)]))
  testField3?: TestObject1[];

  @Field()
  @Middlewares(MW1, MW2)
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

    const mw1 = MetadataStorage.instance.store.getInstance<Middleware>(MW1);
    const mw2 = MetadataStorage.instance.store.getInstance<Middleware>(MW2);

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
    expect(testObject3.fields[2].middlewares).toHaveLength(3);
    expect(testObject3.fields[2].type).toEqual(testObject1);
    expect(testObject3.fields[3].name).toBe("testField2");
    expect(testObject3.fields[3].type).toEqual([testObject1]);
  });
});
