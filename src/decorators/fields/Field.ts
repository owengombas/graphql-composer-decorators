import {
  TypeFunction,
  FieldParams,
  DecoratorHelper,
  MetadataStorage,
} from "../..";

export function Field();
export function Field(name: string);
export function Field(type: TypeFunction);
export function Field(params: FieldParams);
export function Field(type: TypeFunction, params: FieldParams);
export function Field(name: string, params: FieldParams);
export function Field(type: TypeFunction, params: FieldParams);
export function Field(type: TypeFunction, name: string, params: FieldParams);
export function Field(
  nameOrTypeOrParams?: string | TypeFunction | FieldParams,
  nameOrParams?: string | FieldParams,
  params?: FieldParams,
) {
  return DecoratorHelper.getAddFieldFunction(
    (field) => MetadataStorage.instance.addField(field),
    nameOrTypeOrParams,
    nameOrParams,
    params,
  );
}
