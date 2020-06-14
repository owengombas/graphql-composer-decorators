import { Schema, Field, ObjectType } from "../../src";
import { N, ObjectType as ComposerObjectType } from "graphql-composer";

@ObjectType()
class TestObject1 {
  @Field()
  testField1: String;
}

@ObjectType()
class TestObject2 extends TestObject1 {
  @Field(() => [TestObject1])
  testField2: TestObject1[];
}

@ObjectType()
class TestObject3 extends TestObject2 {
  @Field(() => N(String))
  testField1: String;

  @Field(() => N([N(TestObject1)]))
  testField3?: TestObject1[];
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
    expect(testObject1.fields[0].type).toEqual(String);

    expect(testObject2.fields[1].name).toBe("testField1");
    expect(testObject2.fields[1].type).toEqual(String);
    expect(testObject2.fields[0].name).toBe("testField2");
    expect(testObject2.fields[0].type).toEqual([testObject1]);

    expect(testObject3.fields[0].name).toBe("testField1");
    expect(testObject3.fields[0].type).toEqual(N(String));
    expect(testObject3.fields[2].name).toBe("testField2");
    expect(testObject3.fields[2].type).toEqual([testObject1]);
    expect(testObject3.fields[1].name).toBe("testField3");
    expect(testObject3.fields[1].type).toEqual(N([N(testObject1)]));
  });
});
