import { ObjectFieldParams, ExtensionsType } from "..";
import { Args } from "graphql-composer";

export interface BuildingFieldParams extends ObjectFieldParams {
  objectArgs?: Args<any, ExtensionsType>;
}
