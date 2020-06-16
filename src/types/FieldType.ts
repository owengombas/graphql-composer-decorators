import {
  FieldType as ComposerFieldType,
  ClassType,
  NullableType,
  RequiredType,
} from "graphql-composer";

export type FieldType =
  | ClassType
  | NullableType
  | RequiredType
  | ComposerFieldType;
