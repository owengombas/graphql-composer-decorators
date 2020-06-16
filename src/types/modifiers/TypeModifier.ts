import { GQLType } from "graphql-composer";
import { ExtensionsType } from "../../interfaces";

export type TypeModifier = (type: GQLType<any, any, ExtensionsType>) => any;
