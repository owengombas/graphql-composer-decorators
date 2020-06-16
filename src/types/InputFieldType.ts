import {
  InputFieldType as ComposerInputFieldType,
  ClassType,
  NullableType,
  RequiredType,
} from "graphql-composer";

export declare type InputFieldType =
  | ClassType
  | NullableType
  | RequiredType
  | ComposerInputFieldType;
