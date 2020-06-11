import {
  ClassType,
  InputType,
  ObjectType,
  InterfaceType,
} from "graphql-composer";

export class TypeParams {
  hidden?: boolean;
  extends?: ClassType | InputType | ObjectType | InterfaceType;
}
