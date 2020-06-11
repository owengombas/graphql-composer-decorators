import { InterfaceType as T, ClassType } from "graphql-composer";
import { MetadataStorage, TypeParams, MetaType } from "../..";

export function InterfaceType();
export function InterfaceType(name: string);
export function InterfaceType(params: TypeParams);
export function InterfaceType(name: string, params: TypeParams);
export function InterfaceType(
  nameOrParams?: string | TypeParams,
  params?: TypeParams,
) {
  return (target: Function) => {
    let finalName = target.name;
    let finalParams = {};

    if (typeof nameOrParams === "string") {
      finalName = nameOrParams;
    } else if (nameOrParams) {
      finalParams = nameOrParams;
    }

    if (params) {
      finalParams = params;
    }

    const meta: MetaType = {
      key: target.name,
      kind: "interface",
      classType: target,
      params: finalParams,
      meta: {},
    };

    const item = T.create<any>(target as ClassType)
      .setName(finalName)
      .setMeta(meta);

    MetadataStorage.instance.addInterfaceType(item);
  };
}
