import { ObjectType, InputType, InterfaceType } from "graphql-composer";
import { Kind } from "../types";

export class ClassHelper {
  static convertInstanceOfToKind(
    t: typeof ObjectType | typeof InputType | typeof InterfaceType,
  ): Kind {
    switch (t) {
      case ObjectType:
        return "object";
      case InputType:
        return "input";
      case InterfaceType:
        return "interface";
    }
  }
}
