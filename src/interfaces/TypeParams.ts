import {
  ClassType,
  InputType,
  ObjectType,
  InterfaceType,
} from "graphql-composer";

export class TypeParams {
  nullable?: boolean;
  required?: boolean;
  hidden?: boolean;
  extends?: ClassType | InputType | ObjectType | InterfaceType;
}
