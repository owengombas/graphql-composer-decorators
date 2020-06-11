import { FieldParams, MetaType } from "..";
import { Args } from "graphql-composer";

export interface BuildingFieldParams extends FieldParams {
  objectArgs?: Args<any, MetaType>;
}
