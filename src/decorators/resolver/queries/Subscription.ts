import {
  TypeFunction,
  FieldParams,
  DecoratorHelper,
  MetadataStorage,
} from "../../..";

export function Subscription();
export function Subscription(name: string);
export function Subscription(type: TypeFunction);
export function Subscription(params: FieldParams);
export function Subscription(type: TypeFunction, params: FieldParams);
export function Subscription(name: string, params: FieldParams);
export function Subscription(type: TypeFunction, params: FieldParams);
export function Subscription(
  type: TypeFunction,
  name: string,
  params: FieldParams,
);
export function Subscription(
  nameOrTypeOrParams?: string | TypeFunction | FieldParams,
  nameOrParams?: string | FieldParams,
  params?: FieldParams,
) {
  return DecoratorHelper.getAddFieldFunction(
    (field) => MetadataStorage.instance.addSubscription(field),
    nameOrTypeOrParams,
    nameOrParams,
    params,
  );
}
