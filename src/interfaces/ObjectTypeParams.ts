import { InterfaceType } from "graphql-composer";
import { TypeParams } from "./TypeParams";

export class ObjectTypeParams extends TypeParams {
  implements?: (Function | InterfaceType)[];
}
