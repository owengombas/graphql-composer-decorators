import {
  ClassType,
  ObjectType,
  InputType,
  InterfaceType,
  GQLType,
  FieldType,
  InputFieldType,
} from "graphql-composer";
import { MetadataStorage, ClassHelper, ExtensionsType, TypeParams } from "..";

export function RequiredType(
  name: string,
  classType: ClassType,
  type: typeof ObjectType | typeof InputType | typeof InterfaceType,
  hidden?: boolean,
) {
  const kind = ClassHelper.convertInstanceOfToKind(type);
  const s = Symbol();

  MetadataStorage.instance.addTypeCopier({
    classType,
    key: classType.name,
    modifier: (t: InterfaceType | InputType | ObjectType) => {
      if (t.extensions.decoratorInfos.kind === kind) {
        const meta: ExtensionsType<TypeParams> = {
          ...t.extensions,
          decoratorInfos: {
            ...t.extensions.decoratorInfos,
            params: {
              hidden,
            },
          },
        };
        return t.copy().required().setName(name).setExtensions(meta);
      }
    },
    copy: true,
  });

  const t: () => FieldType | InputFieldType = () => {
    return MetadataStorage.instance.built.find((t) => {
      return (
        t.extensions.decoratorInfos.ref === s &&
        t.extensions.decoratorInfos.kind === kind
      );
    }) as any;
  };

  return t;
}
