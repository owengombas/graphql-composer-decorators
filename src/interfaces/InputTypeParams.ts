import { ClassType, InputType } from "graphql-composer";
import { TypeParams } from "./TypeParams";

export interface InputTypeParams extends TypeParams {
  extends?: ClassType | InputType;
}
