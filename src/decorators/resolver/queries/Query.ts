import {
  TypeFunction,
  ObjectFieldParams,
  DecoratorHelper,
  MetadataStorage,
} from "../../..";

export function Query();
export function Query(name: string);
export function Query(type: TypeFunction);
export function Query(params: ObjectFieldParams);
export function Query(type: TypeFunction, params: ObjectFieldParams);
export function Query(name: string, params: ObjectFieldParams);
export function Query(type: TypeFunction, params: ObjectFieldParams);
export function Query(
  type: TypeFunction,
  name: string,
  params: ObjectFieldParams,
);
export function Query(
  nameOrTypeOrParams?: string | TypeFunction | ObjectFieldParams,
  nameOrParams?: string | ObjectFieldParams,
  params?: ObjectFieldParams,
) {
  return DecoratorHelper.getAddFieldFunction(
    (field) => MetadataStorage.instance.addQuery(field),
    nameOrTypeOrParams,
    nameOrParams,
    params,
  );
}
