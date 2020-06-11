import { InputType as T, ClassType } from "graphql-composer";
import { MetadataStorage, TypeParams, MetaType } from "../..";

export function InputType();
export function InputType(name: string);
export function InputType(params: TypeParams);
export function InputType(name: string, params: TypeParams);
export function InputType(
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
      kind: "input",
      classType: target,
      params: finalParams,
      meta: {},
    };

    const item = T.create<any>(target as ClassType)
      .setName(finalName)
      .setMeta(meta);

    MetadataStorage.instance.addInputType(item);
  };
}
