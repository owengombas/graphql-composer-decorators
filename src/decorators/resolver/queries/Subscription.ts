import {
  TypeFunction,
  SubscriptionParams,
  DecoratorHelper,
  MetadataStorage,
} from "../../..";
import { ExtensionsType } from "../../../interfaces";
import { Field } from "graphql-composer";

export function Subscription(params: SubscriptionParams);
export function Subscription(type: TypeFunction, params: SubscriptionParams);
export function Subscription(name: string, params: SubscriptionParams);
export function Subscription(type: TypeFunction, params: SubscriptionParams);
export function Subscription(
  type: TypeFunction,
  name: string,
  params: SubscriptionParams,
);
export function Subscription(
  nameOrTypeOrParams?: string | TypeFunction | SubscriptionParams,
  nameOrParams?: string | SubscriptionParams,
  params?: SubscriptionParams,
) {
  return DecoratorHelper.getAddFieldFunction(
    (field: Field<string, ExtensionsType<SubscriptionParams>>) => {
      field.setSubscription(
        field.extensions.decoratorInfos.params.subscription,
      );
      MetadataStorage.instance.addSubscription(field);
    },
    nameOrTypeOrParams,
    nameOrParams,
    params,
  );
}
