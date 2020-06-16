import {
  ClassType,
  InputType,
  ObjectType,
  InterfaceType,
} from "graphql-composer";
import { Params } from "./Params";

export interface TypeParams extends Params {
  nullable?: boolean;
  required?: boolean;
  hidden?: boolean;
  extends?: ClassType | InputType | ObjectType | InterfaceType;
}
