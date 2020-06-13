import {
  ObjectType,
  Field,
  Schema,
  InterfaceType,
  ObjectField,
} from "../../src";
import { UnionType, ObjectType as ComposerObjectType } from "graphql-composer";

@InterfaceType()
class Animal {
  @Field()
  name: string;
}

@InterfaceType()
@ObjectType({ implements: [Animal] })
class Cat {
  @Field()
  meow: string;
}

@ObjectType({ implements: [Animal, Cat] })
class Cow {
  @Field()
  moh: string;
}

@ObjectType()
class BabyCow extends Cow {
  @Field()
  height: number;
}

const schema = Schema.create().load();

describe("Implementation", () => {
  it("Should implement interfaces", async () => {
    const cat = schema.types[1] as ComposerObjectType;
    const cow = schema.types[2] as ComposerObjectType;
    const babyCow = schema.types[3] as ComposerObjectType;
    const animal = schema.types[4] as ComposerObjectType;
    const catInterface = schema.types[5] as ComposerObjectType;

    expect(cat.interfaces).toEqual([animal]);
    expect(cow.interfaces).toEqual([animal, catInterface]);
    expect(babyCow.interfaces).toEqual([animal, catInterface]);
  });

  it("Should implement interfaces with inheritance", () => {
    const babyCow = schema.types[3] as ComposerObjectType;
    const animal = schema.types[4] as ComposerObjectType;
    const catInterface = schema.types[5] as ComposerObjectType;
    expect(babyCow.interfaces).toEqual([animal, catInterface]);
  });
});
