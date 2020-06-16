import { InterfaceType } from "graphql-composer";
import { TypeParams } from "./TypeParams";

export interface ObjectTypeParams extends TypeParams {
  implements?: (Function | InterfaceType)[];
}
