import {
  TypeFunction,
  ObjectFieldParams,
  DecoratorHelper,
  MetadataStorage,
} from "../..";

export function InterfaceField();
export function InterfaceField(name: string);
export function InterfaceField(type: TypeFunction);
export function InterfaceField(params: ObjectFieldParams);
export function InterfaceField(type: TypeFunction, params: ObjectFieldParams);
export function InterfaceField(name: string, params: ObjectFieldParams);
export function InterfaceField(type: TypeFunction, name: string);
export function InterfaceField(type: TypeFunction, params: ObjectFieldParams);
export function InterfaceField(
  type: TypeFunction,
  name: string,
  params: ObjectFieldParams,
);
export function InterfaceField(
  nameOrTypeOrParams?: string | TypeFunction | ObjectFieldParams,
  nameOrParams?: string | ObjectFieldParams,
  params?: ObjectFieldParams,
) {
  return DecoratorHelper.getAddFieldFunction(
    (field) => MetadataStorage.instance.addInterfaceField(field),
    nameOrTypeOrParams,
    nameOrParams,
    params,
  );
}
