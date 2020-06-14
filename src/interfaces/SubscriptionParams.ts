import { SubscriptionFunction } from "graphql-composer";
import { ObjectFieldParams } from "./ObjectFieldParams";

export interface SubscriptionParams extends ObjectFieldParams {
  subscription: SubscriptionFunction;
}
