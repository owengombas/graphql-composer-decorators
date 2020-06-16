import { KeyValue } from "graphql-composer";

export interface Params<ExtensionsType = KeyValue> {
  extensions?: ExtensionsType;
  description?: string;
  directives?: {
    name: string;
    args?: KeyValue;
  }[];
}
