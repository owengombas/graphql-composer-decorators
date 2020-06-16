import { InputType as T, ClassType } from "graphql-composer";
import {
  MetadataStorage,
  InputTypeParams,
  ExtensionsType,
  DecoratorHelper,
} from "../..";

export function InputType();
export function InputType(name: string);
export function InputType(params: InputTypeParams);
export function InputType(name: string, params: InputTypeParams);
export function InputType(
  nameOrParams?: string | InputTypeParams,
  params?: InputTypeParams,
) {
  return (target: Function) => {
    let finalName = target.name;
    let finalParams: InputTypeParams = {};

    if (typeof nameOrParams === "string") {
      finalName = nameOrParams;
    } else if (nameOrParams) {
      finalParams = nameOrParams;
    }

    if (params) {
      finalParams = params;
    }

    const meta: ExtensionsType = {
      ...(finalParams.extensions || {}),
      decoratorInfos: {
        key: target.name,
        kind: "input",
        classType: target,
        params: finalParams,
      },
    };

    const item = T.create<any>(target as ClassType)
      .setName(finalName)
      .setExtensions(meta)
      .setDirectives(
        ...(finalParams.directives || []).map((d) =>
          DecoratorHelper.parseDirective(d.name, d.args),
        ),
      )
      .setDescription(finalParams.description);

    MetadataStorage.instance.addInputType(item);
  };
}
