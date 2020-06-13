import { Directive as ComposerDirective, KeyValue } from "graphql-composer";
import { MetadataStorage } from "../..";

export function Directive(name: string);
export function Directive(name: string, args: KeyValue);
export function Directive(name: string, args?: KeyValue) {
  return (
    prototype: Function | Object,
    propertyKey?,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    const dir = ComposerDirective.create(name);

    if (args) {
      Object.keys(args).map((key) => {
        dir.addArg(key, args[key]);
      });
    }

    if (typeof prototype === "function") {
      MetadataStorage.instance.addTypeModifier({
        classType: prototype,
        key: prototype.name,
        modifier: (t) => t.addDirectives(dir),
      });
    } else {
      MetadataStorage.instance.addFieldModifier({
        classType: prototype.constructor,
        key: propertyKey,
        modifier: (f) => f.addDirectives(dir),
      });
    }
  };
}
