import { ResolveFunction, GQLObjectType, Field } from "graphql-composer";
import { MetadataStorage } from "../../..";

export function Middlewares(...middlewares: ResolveFunction[]) {
  return (
    prototype: Function | Object,
    propertyKey?,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    const fieldModifier = (f) => {
      if (f instanceof Field) {
        f.addMiddlewares(...middlewares);
      }
    };

    if (typeof prototype === "function") {
      MetadataStorage.instance.addTypeModifier({
        classType: prototype,
        key: prototype.name,
        fieldModifier: fieldModifier,
        modifier: (t) => {
          if (t instanceof GQLObjectType) {
            t.transformFields((f) => {
              f.addMiddlewares(...middlewares);
            });
          }
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
