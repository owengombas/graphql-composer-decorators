import { TypeParams } from "./TypeParams";
import { GraphQLTypeResolver } from "graphql";

export class InterfaceTypeParams extends TypeParams {
  typeResolver?: GraphQLTypeResolver<any, any>;
}
