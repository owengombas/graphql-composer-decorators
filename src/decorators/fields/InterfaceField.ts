import {
  TypeFunction,
  FieldParams,
  DecoratorHelper,
  MetadataStorage,
} from "../..";

export function InterfaceField();
export function InterfaceField(name: string);
export function InterfaceField(type: TypeFunction);
export function InterfaceField(params: FieldParams);
export function InterfaceField(type: TypeFunction, params: FieldParams);
export function InterfaceField(name: string, params: FieldParams);
export function InterfaceField(type: TypeFunction, params: FieldParams);
export function InterfaceField(
  type: TypeFunction,
  name: string,
  params: FieldParams,
);
export function InterfaceField(
  nameOrTypeOrParams?: string | TypeFunction | FieldParams,
  nameOrParams?: string | FieldParams,
  params?: FieldParams,
) {
  return DecoratorHelper.getAddFieldFunction(
    (field) => MetadataStorage.instance.addInterfaceField(field),
    nameOrTypeOrParams,
    nameOrParams,
    params,
  );
}
