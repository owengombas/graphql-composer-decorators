import { Schema, InputType, Field } from "../../src";
import {
  N,
  R,
  InputType as ComposerInputType,
  InputField,
  InputFieldType,
} from "graphql-composer";

@InputType()
class TestInput1 {
  @Field()
  testField1: String;
}

@InputType()
class TestInput2 extends TestInput1 {
  @Field(() => [TestInput1])
  testField2: TestInput1[];
}

@InputType()
class TestInput3 extends TestInput2 {
  @Field(() => N(String))
  testField1: String;

  @Field(() => N([N(TestInput1)]))
  testField3?: TestInput1[];
}

const schema = Schema.create()
  .setConfig({
    requiredByDefault: true,
  })
  .load();

describe("InputType", () => {
  it("Should create an input type", async () => {
    const testInput1 = schema.types[1] as ComposerInputType;
    const testInput2 = schema.types[2] as ComposerInputType;
    const testInput3 = schema.types[3] as ComposerInputType;

    expect(testInput1.name).toBe("TestInput1");
    expect(testInput2.name).toBe("TestInput2");
    expect(testInput3.name).toBe("TestInput3");

    expect(testInput1.fields[0].name).toBe("testField1");
    expect(testInput1.fields[0].type).toEqual(String);

    expect(testInput2.fields[1].name).toBe("testField1");
    expect(testInput2.fields[1].type).toEqual(String);
    expect(testInput2.fields[0].name).toBe("testField2");
    expect(testInput2.fields[0].type).toEqual([testInput1]);

    expect(testInput3.fields[0].name).toBe("testField1");
    expect(testInput3.fields[0].type).toEqual(N(String));
    expect(testInput3.fields[2].name).toBe("testField2");
    expect(testInput3.fields[2].type).toEqual([testInput1]);
    expect(testInput3.fields[1].name).toBe("testField3");
    expect(testInput3.fields[1].type).toEqual(N([N(testInput1)]));
  });
});
