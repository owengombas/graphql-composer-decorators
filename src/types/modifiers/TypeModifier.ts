import { GQLType } from "graphql-composer";
import { MetaType } from "../../interfaces";

export type TypeModifier = (type: GQLType<any, any, MetaType>) => any;
