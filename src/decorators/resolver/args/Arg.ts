import "reflect-metadata";
import { Args, Arg as ComposerArg } from "graphql-composer";
import { MetadataStorage, TypeFunction, ExtensionsType } from "../../..";
import { DecoratorInfos } from "../../../interfaces";

export function Arg(name: string);
export function Arg(name: string, type: TypeFunction);
export function Arg(name: string, type?: TypeFunction) {
  return (target: Object, key: string, index: number) => {
    let typeFn = () =>
      Reflect.getMetadata("design:paramtypes", target, key)[index];

    if (type) {
      typeFn = type;
    }

    const meta: ExtensionsType = {
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
      .setExtensions(meta);

    MetadataStorage.instance.addArgs(args);
  };
}
