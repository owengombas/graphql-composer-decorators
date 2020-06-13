import { InputType, ObjectType, InterfaceType, Field } from "../../../../src";
import { Test1 } from "./Test1";

@ObjectType()
@InterfaceType("TestInterface2")
@InputType("TestInput2")
export class Test2 extends Test1 {
  @Field(() => [Test1])
  testField2: Test1[];
}
