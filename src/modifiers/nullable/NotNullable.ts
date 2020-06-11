import { FieldType, InputFieldType } from "../..";
import { Nullabler } from "./Nullabler";

/**
 * Create a nullable type from an existing one
 * @param type The type to convert
 */
export function NotNullable<
  Type extends FieldType | InputFieldType = FieldType
>(type: Type) {
  return new NotNullableType<Type>(type);
}

export class NotNullableType<
  Type extends FieldType | InputFieldType = FieldType
> extends Nullabler<Type> {}
