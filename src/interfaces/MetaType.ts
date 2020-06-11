import { KeyValue } from "graphql-composer";
import { Kind, TypeFunction } from "..";

export interface MetaType<ParamsType = KeyValue> {
  key: string;
  classType: Function;
  type?: TypeFunction;
  params: ParamsType;
  index?: number;
  kind: Kind;
  meta: KeyValue;
}
