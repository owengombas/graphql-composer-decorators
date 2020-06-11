import { KeyValue, GQLType } from "graphql-composer";
import { MetadataStorage } from "../..";

export function Description(description: string) {
  return (
    prototype: Function | Object,
    propertyKey?,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    if (typeof prototype === "function") {
      MetadataStorage.instance.addTypeModifier({
        classType: prototype,
        key: prototype.name,
        modifier: (t) => t.setDescription(description),
      });
    } else {
      MetadataStorage.instance.addFieldModifier({
        classType: prototype.constructor,
        key: propertyKey,
        modifier: (f) => f.setDescription(description),
      });
    }
  };
}
