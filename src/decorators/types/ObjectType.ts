import { ObjectType as T, ClassType } from "graphql-composer";
import {
  MetadataStorage,
  ExtensionsType,
  ObjectTypeParams,
  DecoratorHelper,
} from "../..";

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
    let finalParams: ObjectTypeParams = {};

    if (typeof nameOrParams === "string") {
      finalName = nameOrParams;
    } else if (nameOrParams) {
      finalParams = nameOrParams;
    }

    if (params) {
      finalParams = params;
    }

    const meta: ExtensionsType<ObjectTypeParams> = {
      decoratorInfos: {
        key: target.name,
        kind: "object",
        classType: target,
        params: finalParams,
      },
    };

    const item = T.create<any>(target as ClassType)
      .setName(finalName)
      .setDescription(finalParams.description)
      .setDirectives(
        ...(finalParams.directives || []).map((d) =>
          DecoratorHelper.parseDirective(d.name, d.args),
        ),
      )
      .setExtensions(meta);

    MetadataStorage.instance.addObjectType(item);
  };
}
