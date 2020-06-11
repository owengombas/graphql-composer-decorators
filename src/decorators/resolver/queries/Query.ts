import {
  TypeFunction,
  FieldParams,
  DecoratorHelper,
  MetadataStorage,
} from "../../..";

export function Query();
export function Query(name: string);
export function Query(type: TypeFunction);
export function Query(params: FieldParams);
export function Query(type: TypeFunction, params: FieldParams);
export function Query(name: string, params: FieldParams);
export function Query(type: TypeFunction, params: FieldParams);
export function Query(type: TypeFunction, name: string, params: FieldParams);
export function Query(
  nameOrTypeOrParams?: string | TypeFunction | FieldParams,
  nameOrParams?: string | FieldParams,
  params?: FieldParams,
) {
  return DecoratorHelper.getAddFieldFunction(
    (field) => MetadataStorage.instance.addQuery(field),
    nameOrTypeOrParams,
    nameOrParams,
    params,
  );
}
