import { KeyValue } from "graphql-composer";
import { Kind, TypeFunction } from "..";

export interface DecoratorInfos<ParamsType = KeyValue> {
  key: string;
  classType: Function;
  type?: TypeFunction;
  params: ParamsType;
  index?: number;
  kind: Kind;
}

export type ExtensionsType<ParamsType = KeyValue> = {
  decoratorInfos: DecoratorInfos<ParamsType>;
  [key: string]: any;
};
