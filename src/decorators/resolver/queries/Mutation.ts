import {
  TypeFunction,
  ObjectFieldParams,
  DecoratorHelper,
  MetadataStorage,
} from "../../..";

export function Mutation();
export function Mutation(name: string);
export function Mutation(type: TypeFunction);
export function Mutation(params: ObjectFieldParams);
export function Mutation(type: TypeFunction, params: ObjectFieldParams);
export function Mutation(name: string, params: ObjectFieldParams);
export function Mutation(type: TypeFunction, params: ObjectFieldParams);
export function Mutation(
  type: TypeFunction,
  name: string,
  params: ObjectFieldParams,
);
export function Mutation(
  nameOrTypeOrParams?: string | TypeFunction | ObjectFieldParams,
  nameOrParams?: string | ObjectFieldParams,
  params?: ObjectFieldParams,
) {
  return DecoratorHelper.getAddFieldFunction(
    (field) => MetadataStorage.instance.addMutation(field),
    nameOrTypeOrParams,
    nameOrParams,
    params,
  );
}
