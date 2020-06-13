import {
  TypeFunction,
  ObjectFieldParams,
  DecoratorHelper,
  MetadataStorage,
} from "../../..";

export function Subscription();
export function Subscription(name: string);
export function Subscription(type: TypeFunction);
export function Subscription(params: ObjectFieldParams);
export function Subscription(type: TypeFunction, params: ObjectFieldParams);
export function Subscription(name: string, params: ObjectFieldParams);
export function Subscription(type: TypeFunction, params: ObjectFieldParams);
export function Subscription(
  type: TypeFunction,
  name: string,
  params: ObjectFieldParams,
);
export function Subscription(
  nameOrTypeOrParams?: string | TypeFunction | ObjectFieldParams,
  nameOrParams?: string | ObjectFieldParams,
  params?: ObjectFieldParams,
) {
  return DecoratorHelper.getAddFieldFunction(
    (field) => MetadataStorage.instance.addSubscription(field),
    nameOrTypeOrParams,
    nameOrParams,
    params,
  );
}
