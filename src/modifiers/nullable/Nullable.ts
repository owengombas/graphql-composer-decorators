import { FieldType, InputFieldType } from "../..";
import { Nullabler } from "./Nullabler";

/**
 * Create a nullable type from an existing one
 * @param type The type to convert
 */
export function Nullable<Type extends FieldType | InputFieldType = FieldType>(
  type: Type,
) {
  return new NullableType<Type>(type);
}

export class NullableType<
  Type extends FieldType | InputFieldType = FieldType
> extends Nullabler<Type> {}
