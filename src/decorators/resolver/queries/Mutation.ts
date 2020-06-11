import {
  TypeFunction,
  FieldParams,
  DecoratorHelper,
  MetadataStorage,
} from "../../..";

export function Mutation();
export function Mutation(name: string);
export function Mutation(type: TypeFunction);
export function Mutation(params: FieldParams);
export function Mutation(type: TypeFunction, params: FieldParams);
export function Mutation(name: string, params: FieldParams);
export function Mutation(type: TypeFunction, params: FieldParams);
export function Mutation(type: TypeFunction, name: string, params: FieldParams);
export function Mutation(
  nameOrTypeOrParams?: string | TypeFunction | FieldParams,
  nameOrParams?: string | FieldParams,
  params?: FieldParams,
) {
  return DecoratorHelper.getAddFieldFunction(
    (field) => MetadataStorage.instance.addMutation(field),
    nameOrTypeOrParams,
    nameOrParams,
    params,
  );
}
