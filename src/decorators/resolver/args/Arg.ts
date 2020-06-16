import "reflect-metadata";
import { Args, Arg as ComposerArg } from "graphql-composer";
import {
  MetadataStorage,
  TypeFunction,
  ExtensionsType,
  ArgParams,
  DecoratorHelper,
} from "../../..";

export function Arg(name: string);
export function Arg(name: string, params: ArgParams);
export function Arg(name: string, type: TypeFunction);
export function Arg(name: string, type: TypeFunction, params: ArgParams);
export function Arg(
  name: string,
  typeOrParams?: TypeFunction | ArgParams,
  params?: ArgParams,
) {
  return (target: Object, key: string, index: number) => {
    let finalParams: ArgParams = {};
    let typeFn = () =>
      Reflect.getMetadata("design:paramtypes", target, key)[index];

    if (typeof typeOrParams === "object") {
      finalParams = typeOrParams;
    } else if (typeof typeOrParams === "function") {
      typeFn = typeOrParams;
    }

    if (params) {
      finalParams = params;
    }

    const meta: ExtensionsType = {
      ...(finalParams.extensions || {}),
      decoratorInfos: {
        classType: target.constructor,
        key,
        kind: "arg",
        index,
        type: typeFn,
        params: {},
      },
    };

    const args = Args.create()
      .setName(name)
      .addArgs(ComposerArg.create(name, Boolean).setExtensions(meta))
      .setDirectives(
        ...(finalParams.directives || []).map((d) =>
          DecoratorHelper.parseDirective(d.name, d.args),
        ),
      )
      .setExtensions(meta)
      .setDescription(finalParams.description);

    MetadataStorage.instance.addArgs(args);
  };
}
