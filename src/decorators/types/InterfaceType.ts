import { InterfaceType as T, ClassType } from "graphql-composer";
import {
  MetadataStorage,
  TypeParams,
  ExtensionsType,
  InterfaceTypeParams,
  DecoratorHelper,
} from "../..";

export function InterfaceType();
export function InterfaceType(name: string);
export function InterfaceType(params: InterfaceTypeParams);
export function InterfaceType(name: string, params: InterfaceTypeParams);
export function InterfaceType(
  nameOrParams?: string | TypeParams,
  params?: TypeParams,
) {
  return (target: Function) => {
    let finalName = target.name;
    let finalParams: InterfaceTypeParams = {};

    if (typeof nameOrParams === "string") {
      finalName = nameOrParams;
    } else if (nameOrParams) {
      finalParams = nameOrParams;
    }

    if (params) {
      finalParams = params;
    }

    const meta: ExtensionsType = {
      decoratorInfos: {
        key: target.name,
        kind: "interface",
        classType: target,
        params: finalParams,
      },
    };

    const item = T.create<any>(target as ClassType)
      .setName(finalName)
      .setExtensions(meta)
      .setDescription(finalParams.description)
      .setDirectives(
        ...(finalParams.directives || []).map((d) =>
          DecoratorHelper.parseDirective(d.name, d.args),
        ),
      )
      .setTypeResolver(finalParams.typeResolver);

    MetadataStorage.instance.addInterfaceType(item);
  };
}
