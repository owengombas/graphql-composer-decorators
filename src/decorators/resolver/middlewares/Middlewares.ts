import {
  GQLObjectType,
  Field,
  ResolveFunction,
  ClassType,
} from "graphql-composer";
import { MetadataStorage } from "../../..";
import { Middleware } from "../../../classes/Middleware";

export function Middlewares(
  ...middlewares: (typeof Middleware | ResolveFunction)[]
) {
  return (
    prototype: Function | Object,
    propertyKey?,
    descriptor?: TypedPropertyDescriptor<any>,
  ) => {
    const mws = middlewares.map((mw) => {
      if (Object.getPrototypeOf(mw) === Middleware) {
        const instance: Middleware = new (mw as ClassType)();
        return instance.resolve.bind(instance);
      } else {
        return mw;
      }
    });

    const fieldModifier = (f) => {
      if (f instanceof Field) {
        f.addMiddlewares(...mws);
      }
    };

    if (typeof prototype === "function") {
      MetadataStorage.instance.addTypeModifier({
        classType: prototype,
        key: prototype.name,
        fieldModifier: fieldModifier,
        modifier: (t) => {
          if (t instanceof GQLObjectType) {
            t.transformFields(fieldModifier);
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
