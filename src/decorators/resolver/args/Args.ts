import { Args as ComposerArgs } from "graphql-composer";
import { MetadataStorage, MetaType } from "../../..";

export function Args() {
  return (target: Object, key: string, index: number) => {
    const meta: MetaType = {
      classType: target.constructor,
      key,
      kind: "flat-args",
      index,
      type: () => Reflect.getMetadata("design:paramtypes", target, key)[index],
      params: {},
      meta: {},
    };

    const args = ComposerArgs.create().setMeta(meta);

    MetadataStorage.instance.addArgs(args);
  };
}
