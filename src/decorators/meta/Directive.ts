import { Directive as ComposerDirective, KeyValue } from "graphql-composer";
import { MetadataStorage } from "../..";
import { DecoratorHelper } from "../../helpers";

export function Directive(name: string);
export function Directive(name: string, args: KeyValue);
export function Directive(name: string, args?: KeyValue) {
  return (
    prototype: Function | Object,
    propertyKey?,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    const dir = DecoratorHelper.parseDirective(name, args);

    if (typeof prototype === "function") {
      MetadataStorage.instance.addTypeModifier({
        classType: prototype,
        key: prototype.name,
        fieldModifier: (f) => f.addDirectives(dir),
        modifier: (t) => {
          t.addDirectives(dir);
        },
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
