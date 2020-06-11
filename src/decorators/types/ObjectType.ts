import { ObjectType as T, ClassType } from "graphql-composer";
import { MetadataStorage, MetaType, ObjectTypeParams } from "../..";

export function ObjectType();
export function ObjectType(name: string);
export function ObjectType(params: ObjectTypeParams);
export function ObjectType(name: string, params: ObjectTypeParams);
export function ObjectType(
  nameOrParams?: string | ObjectTypeParams,
  params?: ObjectTypeParams,
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

    const meta: MetaType<ObjectTypeParams> = {
      key: target.name,
      kind: "object",
      classType: target,
      params: finalParams,
      meta: {},
    };

    const item = T.create<any>(target as ClassType)
      .setName(finalName)
      .setMeta(meta);

    MetadataStorage.instance.addObjectType(item);
  };
}
