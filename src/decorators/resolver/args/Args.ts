import { Args as ComposerArgs } from "graphql-composer";
import { MetadataStorage, ExtensionsType } from "../../..";

export function Args() {
  return (target: Object, key: string, index: number) => {
    const meta: ExtensionsType = {
      decoratorInfos: {
        classType: target.constructor,
        key,
        kind: "flat-args",
        index,
        type: () =>
          Reflect.getMetadata("design:paramtypes", target, key)[index],
        params: {},
      },
    };

    const args = ComposerArgs.create().setExtensions(meta);

    MetadataStorage.instance.addArgs(args);
  };
}
