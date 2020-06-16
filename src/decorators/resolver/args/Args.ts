import { Args as ComposerArgs } from "graphql-composer";
import { MetadataStorage, ExtensionsType, TypeFunction } from "../../..";

export function Args();
export function Args(type: TypeFunction);
export function Args(type?: TypeFunction) {
  return (target: Object, key: string, index: number) => {
    const typeFn = () =>
      Reflect.getMetadata("design:paramtypes", target, key)[index];

    const meta: ExtensionsType = {
      decoratorInfos: {
        classType: target.constructor,
        key,
        kind: "flat-args",
        index,
        type: type || typeFn,
        params: {},
      },
    };

    const args = ComposerArgs.create().setExtensions(meta);

    MetadataStorage.instance.addArgs(args);
  };
}
