import {
  InputFieldType as ComposerInputFieldType,
  ClassType,
} from "graphql-composer";
import { NotNullableType, NullableType } from "..";

export declare type InputFieldType =
  | ClassType
  | NullableType
  | NotNullableType
  | ComposerInputFieldType;
