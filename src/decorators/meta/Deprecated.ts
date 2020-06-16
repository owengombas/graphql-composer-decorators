import { MetadataStorage } from "../..";

export function Deprecated(reason: string) {
  return (
    prototype: Object | Function,
    propertyKey?: string,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    const fieldModifier = (f) => f.setDeprecationReason(reason);

    if (typeof prototype === "function") {
      MetadataStorage.instance.addTypeModifier({
        classType: prototype,
        key: prototype.name,
        fieldModifier,
        modifier: (t) => {
          t.fields.map(fieldModifier);
        },
      });
    } else {
      MetadataStorage.instance.addFieldModifier({
        classType: prototype.constructor,
        key: propertyKey,
        modifier: fieldModifier,
      });
    }
  };
}
