export interface Modifier<ModifierType, FieldModifierType = any> {
  modifier: ModifierType;
  fieldModifier?: FieldModifierType;
  classType: Function;
  key: string;
  copy?: boolean;
}
