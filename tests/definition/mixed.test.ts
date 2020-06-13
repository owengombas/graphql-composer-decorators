import {
  Schema,
  Field,
  InterfaceType,
  InputType,
  ObjectType,
  ObjectField,
  InputField,
  InterfaceField,
} from "../../src";
import {
  N,
  InterfaceType as ComposerInterfaceType,
  InputType as ComposerInputType,
  ObjectType as ComposerObjectType,
} from "graphql-composer";

/**
 * TESTED HERE:
 * - relationType
 * - auto relation type
 * - multiple type linked to a class
 * - inheritance
 * - @Field, @InputField, @InterfaceField, @ObjectField.
 * - resolve type to a class (array, nullable, nested nullable)
 */

@ObjectType()
@InterfaceType("TestInterface1")
@InputType("TestInput1")
class Test1 {
  @Field()
  testField1: String;

  @ObjectField()
  @InputField()
  mixedField1: String;
}

@ObjectType()
@InterfaceType("TestInterface2")
@InputType("TestInput2")
class Test2 extends Test1 {
  @Field(() => [Test1])
  testField2: Test1[];
}

@ObjectType()
@InterfaceType("TestInterface3")
@InputType("TestInput3")
class Test3 extends Test2 {
  @Field()
  @InterfaceField(() => N(String), "testInterfaceField1")
  @ObjectField(() => N(String))
  @InputField(() => N(String))
  testField1: String;

  @Field(() => N([N(Test1)]), { relationType: ComposerInterfaceType })
  testField3?: Test1[];
}

const schema = Schema.create()
  .setConfig({
    requiredByDefault: true,
  })
  .load();

describe("Mixed types", () => {
  it("Should create the object types", async () => {
    const test1 = schema.types[1] as ComposerObjectType;
    const test2 = schema.types[2] as ComposerObjectType;
    const test3 = schema.types[3] as ComposerObjectType;
    const testInterface1 = schema.types[4] as ComposerInterfaceType;

    expect(test1.name).toBe("Test1");
    expect(test2.name).toBe("Test2");
    expect(test3.name).toBe("Test3");

    expect(test1.fields[0].name).toBe("mixedField1");
    expect(test1.fields[0].type).toEqual(String);
    expect(test1.fields[1].name).toBe("testField1");
    expect(test1.fields[1].type).toEqual(String);

    expect(test2.fields[0].name).toBe("testField2");
    expect(test2.fields[0].type).toEqual([test1]);
    expect(test2.fields[1].name).toBe("mixedField1");
    expect(test2.fields[1].type).toEqual(String);
    expect(test2.fields[2].name).toBe("testField1");
    expect(test2.fields[2].type).toEqual(String);

    expect(test3.fields[0].name).toBe("testField1");
    expect(test3.fields[0].type).toEqual(N(String));
    expect(test3.fields[1].name).toBe("testField3");
    expect(test3.fields[1].type).toEqual(N([N(testInterface1)]));
    expect(test3.fields[2].name).toBe("testField2");
    expect(test3.fields[2].type).toEqual([test1]);
    expect(test3.fields[3].name).toBe("mixedField1");
    expect(test3.fields[3].type).toEqual(String);
  });

  it("Should create the interface types", async () => {
    const test1 = schema.types[4] as ComposerInterfaceType;
    const test2 = schema.types[5] as ComposerInterfaceType;
    const test3 = schema.types[6] as ComposerInterfaceType;

    expect(test1.name).toBe("TestInterface1");
    expect(test2.name).toBe("TestInterface2");
    expect(test3.name).toBe("TestInterface3");

    expect(test1.fields[0].name).toBe("testField1");
    expect(test1.fields[0].type).toEqual(String);

    expect(test2.fields[0].name).toBe("testField2");
    expect(test2.fields[0].type).toEqual([test1]);
    expect(test2.fields[1].name).toBe("testField1");
    expect(test2.fields[1].type).toEqual(String);

    expect(test3.fields[0].name).toBe("testInterfaceField1");
    expect(test3.fields[0].type).toEqual(N(String));
    expect(test3.fields[1].name).toBe("testField3");
    expect(test3.fields[1].type).toEqual(N([N(test1)]));
    expect(test3.fields[2].name).toBe("testField2");
    expect(test3.fields[2].type).toEqual([test1]);
  });

  it("Should create the input types", async () => {
    const test1 = schema.types[7] as ComposerInputType;
    const test2 = schema.types[8] as ComposerInputType;
    const test3 = schema.types[9] as ComposerInputType;

    expect(test1.name).toBe("TestInput1");
    expect(test2.name).toBe("TestInput2");
    expect(test3.name).toBe("TestInput3");

    expect(test1.fields[0].name).toBe("mixedField1");
    expect(test1.fields[0].type).toEqual(String);
    expect(test1.fields[1].name).toBe("testField1");
    expect(test1.fields[1].type).toEqual(String);

    expect(test2.fields[0].name).toBe("testField2");
    expect(test2.fields[0].type).toEqual([test1]);
    expect(test2.fields[1].name).toBe("mixedField1");
    expect(test2.fields[1].type).toEqual(String);
    expect(test2.fields[2].name).toBe("testField1");
    expect(test2.fields[2].type).toEqual(String);

    expect(test3.fields[0].name).toBe("testField1");
    expect(test3.fields[0].type).toEqual(N(String));
    expect(test3.fields[1].name).toBe("testField3");
    expect(test3.fields[1].type).toEqual(N([N(test1)]));
    expect(test3.fields[2].name).toBe("testField2");
    expect(test3.fields[2].type).toEqual([test1]);
    expect(test3.fields[3].name).toBe("mixedField1");
    expect(test3.fields[3].type).toEqual(String);
  });
});
