import {
  ObjectType,
  InterfaceType,
  InputType,
  Field,
  InputField,
  ObjectField,
} from "../../../../src";

@ObjectType()
@InterfaceType("TestInterface1")
@InputType("TestInput1")
export class Test1 {
  @Field()
  testField1: String;

  @ObjectField()
  @InputField()
  mixedField1: String;
}
