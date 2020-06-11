import "reflect-metadata";
import { FieldParams, TypeFunction, MetaType } from "..";
import { Field } from "graphql-composer";

export class DecoratorHelper {
  static getAddFieldFunction(
    cb: (field: Field) => void,
    nameOrTypeOrParams?: string | TypeFunction | FieldParams,
    nameOrParams?: string | FieldParams,
    params?: FieldParams,
  ) {
    return (target: Object, key: string, descriptor: PropertyDescriptor) => {
      let typeFn = () => Reflect.getMetadata("design:type", target, key);

      if (descriptor?.value) {
        typeFn = () => Reflect.getMetadata("design:returntype", target, key);
      }

      let finalName: string = key;
      let finalParams: FieldParams = {};

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
        finalParams = nameOrTypeOrParams as FieldParams;
      } else if (typeof nameOrTypeOrParams === "function") {
        typeFn = nameOrTypeOrParams;
      }

      const meta: MetaType<FieldParams> = {
        key,
        kind: "field",
        classType: target.constructor,
        type: typeFn,
        params: finalParams,
        meta: {},
      };

      const field = Field.create<any>(finalName, Boolean).setMeta(meta);

      if (descriptor) {
        field.setResolver(descriptor.value);
      }

      cb(field);
    };
  }
}
