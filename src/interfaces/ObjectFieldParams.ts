import { InterfaceType, ObjectType, InputType } from "graphql-composer";
import { FieldParams } from "./FieldParams";

export interface ObjectFieldParams extends FieldParams {
  relationType?: typeof InputType | typeof InterfaceType | typeof ObjectType;
}
