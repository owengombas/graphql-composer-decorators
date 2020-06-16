import { GQLField } from "graphql-composer";
import { BuildingFieldParams } from "../..";

export type FieldModifier = (field: GQLField<any, BuildingFieldParams>) => any;
