import { FieldType, InputFieldType } from "../..";

export abstract class Nullabler<
  Type extends FieldType | InputFieldType = FieldType
> {
  private _type: Type;

  get type() {
    return this._type;
  }

  constructor(type: Type) {
    this._type = type;
  }
}
