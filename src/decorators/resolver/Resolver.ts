import { MetadataStorage } from "../..";
import { ClassType } from "graphql-composer";

export function Resolver() {
  return (target: Function) => {
    MetadataStorage.instance.addResolver(target as ClassType);
  };
}
