import {
  ClassType,
  InputType,
  ObjectType,
  InterfaceType,
} from "graphql-composer";

export class TypeParams {
  partial?: boolean;
  required?: boolean;
  hidden?: boolean;
  extends?: ClassType | InputType | ObjectType | InterfaceType;
}
