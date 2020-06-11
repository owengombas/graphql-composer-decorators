import { InterfaceType, ObjectType, InputType } from "graphql-composer";

export class FieldParams {
  relationType?: typeof InputType | typeof InterfaceType | typeof ObjectType;
}
