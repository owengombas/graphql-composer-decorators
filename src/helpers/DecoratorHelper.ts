import "reflect-metadata";
import { ObjectFieldParams, TypeFunction, ExtensionsType } from "..";
import { Field } from "graphql-composer";

export class DecoratorHelper {
  static getAddFieldFunction(
    cb: (field: Field) => void,
    nameOrTypeOrParams?: string | TypeFunction | ObjectFieldParams,
    nameOrParams?: string | ObjectFieldParams,
    params?: ObjectFieldParams,
  ) {
    return (target: Object, key: string, descriptor: PropertyDescriptor) => {
      let typeFn = () => Reflect.getMetadata("design:type", target, key);

      if (descriptor?.value) {
        typeFn = () => Reflect.getMetadata("design:returntype", target, key);
      }

      let finalName: string = key;
      let finalParams: ObjectFieldParams = {};

      if (params) {
        typeFn = nameOrTypeOrParams as TypeFunction;
        finalName = nameOrParams as string;
        finalParams = params;
      }

      if (typeof nameOrParams === "string") {
        finalName = nameOrParams as string;
      } else if (typeof nameOrParams === "object") {
        finalParams = nameOrParams;
      }

      if (typeof nameOrTypeOrParams === "string") {
        finalName = nameOrTypeOrParams as string;
      } else if (typeof nameOrTypeOrParams === "object") {
        finalParams = nameOrTypeOrParams as ObjectFieldParams;
      } else if (typeof nameOrTypeOrParams === "function") {
        typeFn = nameOrTypeOrParams;
      }

      const meta: ExtensionsType<ObjectFieldParams> = {
        decoratorInfos: {
          key,
          kind: "field",
          classType: target.constructor,
          type: typeFn,
          params: finalParams,
        },
      };

      const field = Field.create<any>(finalName, Boolean).setExtensions(meta);

      if (descriptor) {
        field.setResolver(descriptor.value);
      }

      cb(field);
    };
  }
}
