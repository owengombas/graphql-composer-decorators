import {
  TypeFunction,
  ObjectFieldParams,
  DecoratorHelper,
  MetadataStorage,
} from "../..";

export function Field();
export function Field(name: string);
export function Field(type: TypeFunction);
export function Field(params: ObjectFieldParams);
export function Field(type: TypeFunction, params: ObjectFieldParams);
export function Field(name: string, params: ObjectFieldParams);
export function Field(type: TypeFunction, name: string);
export function Field(type: TypeFunction, params: ObjectFieldParams);
export function Field(
  type: TypeFunction,
  name: string,
  params: ObjectFieldParams,
);
export function Field(
  nameOrTypeOrParams?: string | TypeFunction | ObjectFieldParams,
  nameOrParams?: string | ObjectFieldParams,
  params?: ObjectFieldParams,
) {
  return DecoratorHelper.getAddFieldFunction(
    (field) => MetadataStorage.instance.addField(field),
    nameOrTypeOrParams,
    nameOrParams,
    params,
  );
}
