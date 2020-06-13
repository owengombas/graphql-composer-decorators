import {
  TypeFunction,
  ObjectFieldParams,
  DecoratorHelper,
  MetadataStorage,
} from "../..";

export function ObjectField();
export function ObjectField(name: string);
export function ObjectField(type: TypeFunction);
export function ObjectField(params: ObjectFieldParams);
export function ObjectField(type: TypeFunction, params: ObjectFieldParams);
export function ObjectField(name: string, params: ObjectFieldParams);
export function ObjectField(type: TypeFunction, name: string);
export function ObjectField(type: TypeFunction, params: ObjectFieldParams);
export function ObjectField(
  type: TypeFunction,
  name: string,
  params: ObjectFieldParams,
);
export function ObjectField(
  nameOrTypeOrParams?: string | TypeFunction | ObjectFieldParams,
  nameOrParams?: string | ObjectFieldParams,
  params?: ObjectFieldParams,
) {
  return DecoratorHelper.getAddFieldFunction(
    (field) => MetadataStorage.instance.addObjectField(field),
    nameOrTypeOrParams,
    nameOrParams,
    params,
  );
}
