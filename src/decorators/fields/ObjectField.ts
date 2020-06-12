import {
  TypeFunction,
  FieldParams,
  DecoratorHelper,
  MetadataStorage,
} from "../..";

export function ObjectField();
export function ObjectField(name: string);
export function ObjectField(type: TypeFunction);
export function ObjectField(params: FieldParams);
export function ObjectField(type: TypeFunction, params: FieldParams);
export function ObjectField(name: string, params: FieldParams);
export function ObjectField(type: TypeFunction, params: FieldParams);
export function ObjectField(
  type: TypeFunction,
  name: string,
  params: FieldParams,
);
export function ObjectField(
  nameOrTypeOrParams?: string | TypeFunction | FieldParams,
  nameOrParams?: string | FieldParams,
  params?: FieldParams,
) {
  return DecoratorHelper.getAddFieldFunction(
    (field) => MetadataStorage.instance.addObjectField(field),
    nameOrTypeOrParams,
    nameOrParams,
    params,
  );
}
