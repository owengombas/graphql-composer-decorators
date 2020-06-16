import { Next, Context } from "graphql-composer";

export abstract class Middleware {
  abstract resolve<ReturnType = any, ArgsType = any, SourceType = any>(
    args: ArgsType,
    context: Context<ReturnType, SourceType>,
    next: Next,
  ): any;
}
