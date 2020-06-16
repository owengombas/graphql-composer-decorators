import { TypeParams } from "./TypeParams";
import { GraphQLTypeResolver } from "graphql";

export interface InterfaceTypeParams extends TypeParams {
  typeResolver?: GraphQLTypeResolver<any, any>;
}
