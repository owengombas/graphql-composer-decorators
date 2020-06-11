import { FieldType as ComposerFieldType, ClassType } from "graphql-composer";
import { NullableType, NotNullableType } from "..";

export type FieldType =
  | ClassType
  | NullableType
  | NotNullableType
  | ComposerFieldType;
