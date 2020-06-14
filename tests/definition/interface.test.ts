import { Schema, Field, InterfaceType } from "../../src";
import { N, R, InterfaceType as ComposerInterfaceType } from "graphql-composer";

@InterfaceType()
class TestInterface1 {
  @Field()
  testField1: String;
}

@InterfaceType()
class TestInterface2 extends TestInterface1 {
  @Field(() => [TestInterface1])
  testField2: TestInterface1[];
}

@InterfaceType()
class TestInterface3 extends TestInterface2 {
  @Field(() => N(String))
  testField1: String;

  @Field(() => N([N(TestInterface1)]))
  testField3?: TestInterface1[];
}

const schema = Schema.create()
  .setConfig({
    requiredByDefault: true,
  })
  .load();

describe("InputType", () => {
  it("Should create an input type", async () => {
    const testInterface1 = schema.types[0] as ComposerInterfaceType;
    const testInterface2 = schema.types[1] as ComposerInterfaceType;
    const testInterface3 = schema.types[2] as ComposerInterfaceType;

    expect(testInterface1.name).toBe("TestInterface1");
    expect(testInterface2.name).toBe("TestInterface2");
    expect(testInterface3.name).toBe("TestInterface3");

    expect(testInterface1.fields[0].name).toBe("testField1");
    expect(testInterface1.fields[0].type).toEqual(String);

    expect(testInterface2.fields[1].name).toBe("testField1");
    expect(testInterface2.fields[1].type).toEqual(String);
    expect(testInterface2.fields[0].name).toBe("testField2");
    expect(testInterface2.fields[0].type).toEqual([testInterface1]);

    expect(testInterface3.fields[0].name).toBe("testField1");
    expect(testInterface3.fields[0].type).toEqual(N(String));
    expect(testInterface3.fields[2].name).toBe("testField2");
    expect(testInterface3.fields[2].type).toEqual([testInterface1]);
    expect(testInterface3.fields[1].name).toBe("testField3");
    expect(testInterface3.fields[1].type).toEqual(N([N(testInterface1)]));
  });
});
