import "reflect-metadata";
import {
  ObjectFieldParams,
  TypeFunction,
  ExtensionsType,
  BuildingFieldParams,
} from "..";
import { Field, Directive, KeyValue } from "graphql-composer";

export class DecoratorHelper {
  static getAddFieldFunction(
    cb: (
      field: Field<string, ExtensionsType<BuildingFieldParams>>,
      target: Object,
      key: string,
      descriptor: PropertyDescriptor,
    ) => void,
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
        ...(finalParams.extensions || {}),
        decoratorInfos: {
          key,
          kind: "field",
          classType: target.constructor,
          type: typeFn,
          params: finalParams,
        },
      };

      const field = Field.create<any>(finalName, Boolean)
        .setExtensions(meta)
        .setDescription(finalParams.description)
        .setDirectives(
          ...(finalParams.directives || []).map((d) =>
            this.parseDirective(d.name, d.args),
          ),
        )
        .setDeprecationReason(finalParams.deprecationReason);

      if (descriptor) {
        field.setResolver(descriptor.value);
      }

      cb(field, target, key, descriptor);
    };
  }

  static parseDirective(name: string, args: KeyValue) {
    const dir = Directive.create(name);

    if (args) {
      Object.keys(args).map((key) => {
        dir.addArg(key, args[key]);
      });
    }

    return dir;
  }
}
