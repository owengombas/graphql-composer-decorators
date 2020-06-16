import { InputField as ComposerInputField } from "graphql-composer";
import {
  TypeFunction,
  DecoratorHelper,
  MetadataStorage,
  FieldParams,
} from "../..";

export function InputField();
export function InputField(name: string);
export function InputField(type: TypeFunction);
export function InputField(params: FieldParams);
export function InputField(type: TypeFunction, params: FieldParams);
export function InputField(name: string, params: FieldParams);
export function InputField(type: TypeFunction, name: string);
export function InputField(type: TypeFunction, params: FieldParams);
export function InputField(
  type: TypeFunction,
  name: string,
  params: FieldParams,
);
export function InputField(
  nameOrTypeOrParams?: string | TypeFunction | FieldParams,
  nameOrParams?: string | FieldParams,
  params?: FieldParams,
) {
  return DecoratorHelper.getAddFieldFunction(
    (field) =>
      MetadataStorage.instance.addInputField(field.convert(ComposerInputField)),
    nameOrTypeOrParams,
    nameOrParams,
    params,
  );
}
