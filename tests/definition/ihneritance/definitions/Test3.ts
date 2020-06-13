import { N, InterfaceType as ComposerInterfaceType } from "graphql-composer";
import {
  InterfaceField,
  ObjectField,
  ObjectType,
  InterfaceType,
  InputType,
  Field,
  InputField,
} from "../../../../src";
import { Test2 } from "./Test2";
import { Test1 } from "./Test1";

@ObjectType()
@InterfaceType("TestInterface3")
@InputType("TestInput3")
export class Test3 extends Test2 {
  @Field()
  @InterfaceField(() => N(String), "testInterfaceField1")
  @ObjectField(() => N(String))
  @InputField(() => N(String))
  testField1: String;

  @Field(() => N([N(Test1)]), { relationType: ComposerInterfaceType })
  testField3?: Test1[];
}
