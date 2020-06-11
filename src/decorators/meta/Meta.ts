import { KeyValue } from "graphql-composer";
import { MetadataStorage } from "../..";

export function Meta<MetaType = KeyValue>(meta: MetaType) {
  return (
    prototype: Function | Object,
    propertyKey?,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    if (typeof prototype === "function") {
      MetadataStorage.instance.addTypeModifier({
        classType: prototype,
        key: prototype.name,
        modifier: (t) =>
          t.setMeta({
            ...t.meta,
            meta,
          }),
      });
    } else {
      MetadataStorage.instance.addFieldModifier({
        classType: prototype.constructor,
        key: propertyKey,
        modifier: (f) =>
          f.setMeta({
            ...f.meta,
            meta,
          }),
      });
    }
  };
}
