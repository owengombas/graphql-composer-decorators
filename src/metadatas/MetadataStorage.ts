import {
  ObjectType,
  InterfaceType,
  InputType,
  Field,
  InputField,
  ClassType,
  GQLType,
  GQLField,
  TypeParser,
  ResolveFunction,
  Args,
  FieldType,
  RequiredType,
  NullableType,
  UnionType,
  GQLAnyType,
  N,
  R,
  EnumType,
} from "graphql-composer";
import {
  Kind,
  ExtensionsType,
  DIStore,
  ObjectFieldParams,
  ObjectTypeParams,
  TypeParams,
  BuildingFieldParams,
  Modifier,
  TypeModifier,
  FieldModifier,
  DecoratorInfos,
} from "..";

export type TypeMap = {
  interface?: InterfaceType<any, ExtensionsType>;
  input?: InputType<any, ExtensionsType>;
  object?: ObjectType<any, ExtensionsType>;
};

export class MetadataStorage {
  private static _instance: MetadataStorage;

  static get instance() {
    if (!this._instance) {
      this._instance = new MetadataStorage();
    }
    return this._instance;
  }

  private _store: DIStore = new DIStore();

  private _queryType = ObjectType.create("Query") as ObjectType<
    any,
    ExtensionsType<ObjectTypeParams>
  >;
  private _mutationType = ObjectType.create("Mutation") as ObjectType<
    any,
    ExtensionsType<ObjectTypeParams>
  >;
  private _subscriptionType = ObjectType.create("Subscription") as ObjectType<
    any,
    ExtensionsType<ObjectTypeParams>
  >;

  private _queries: Field<any, ExtensionsType<BuildingFieldParams>>[] = [];
  private _mutations: Field<any, ExtensionsType<BuildingFieldParams>>[] = [];
  private _subscriptions: Field<
    any,
    ExtensionsType<BuildingFieldParams>
  >[] = [];

  private _allTypes: GQLType<any, any, ExtensionsType<TypeParams>>[] = [];
  private _objectTypes: ObjectType<
    any,
    ExtensionsType<ObjectTypeParams>
  >[] = [];
  private _inputTypes: InputType<any, ExtensionsType<TypeParams>>[] = [];
  private _interfaceTypes: InterfaceType<
    any,
    ExtensionsType<TypeParams>
  >[] = [];
  private _classTypeMap: Map<Function, TypeMap> = new Map();

  private _allFields: GQLField<
    any,
    any,
    ExtensionsType<BuildingFieldParams>
  >[] = [];
  private _fields: Field<any, ExtensionsType<BuildingFieldParams>>[] = [];
  private _objectFields: Field<any, ExtensionsType<BuildingFieldParams>>[] = [];
  private _inputFields: InputField<
    any,
    ExtensionsType<BuildingFieldParams>
  >[] = [];
  private _interfaceFields: Field<
    any,
    ExtensionsType<BuildingFieldParams>
  >[] = [];

  private _fieldModifiers: Modifier<FieldModifier>[] = [];
  private _typeModifiers: Modifier<TypeModifier>[] = [];
  private _typeCopiers: Modifier<TypeModifier>[] = [];

  private _resolvers: Set<Function> = new Set();

  private _args: Args<any, ExtensionsType<ObjectFieldParams>>[] = [];

  private _built: GQLAnyType<any, ExtensionsType>[] = [];

  get built() {
    return this._built;
  }

  get classTypeMap() {
    return this._classTypeMap;
  }

  get store() {
    return this._store;
  }

  addObjectType(item: ObjectType<any, any>) {
    this._objectTypes.push(item);
  }

  addInputType(item: InputType<any, any>) {
    this._inputTypes.push(item);
  }

  addInterfaceType(item: InterfaceType<any, any>) {
    this._interfaceTypes.push(item);
  }

  addField(item: Field<any, any>) {
    this._fields.push(item);
  }

  addObjectField(item: Field<any, any>) {
    this._objectFields.push(item);
  }

  addInputField(item: InputField<any, any>) {
    this._inputFields.push(item);
  }

  addInterfaceField(item: Field<any, any>) {
    this._interfaceFields.push(item);
  }

  addQuery(item: Field<any, any>) {
    this._queries.push(item);
  }

  addMutation(item: Field<any, any>) {
    this._mutations.push(item);
  }

  addSubscription(item: Field<any, any>) {
    this._subscriptions.push(item);
  }

  addArgs(item: Args<any, any>) {
    this._args.push(item);
  }

  addFieldModifier(item: Modifier<FieldModifier>) {
    this._fieldModifiers.push(item);
  }

  addTypeModifier(item: Modifier<TypeModifier>) {
    this._typeModifiers.push(item);
  }

  addTypeCopier(item: Modifier<TypeModifier>) {
    this._typeCopiers.push(item);
  }

  addResolver<T extends ClassType = any>(item: T) {
    this._resolvers.add(item);
    this._store.createInstance(item);
  }

  build() {
    this._allTypes = [
      ...this._objectTypes,
      ...this._interfaceTypes,
      ...this._inputTypes,
    ];

    // Create type map
    this._allTypes.map((t) => {
      const el = this._classTypeMap.get(t.extensions.decoratorInfos.classType);
      const value: TypeMap = el || {};

      value[t.extensions.decoratorInfos.kind] = t;

      this._classTypeMap.set(t.extensions.decoratorInfos.classType, value);
    });

    // Add the @Field fields to the corresponding types, but check if it doesn't already exists (don't override)
    this._fields.map((f) => {
      this.addFieldWithoutDuplication(this._objectFields, f);
      this.addFieldWithoutDuplication(this._interfaceFields, f);
      this.addFieldWithoutDuplication(
        this._inputFields,
        f.convert(InputField) as any,
      );
    });

    this._allFields = [
      ...this._objectFields,
      ...this._interfaceFields,
      ...this._inputFields,
      ...this._queries,
      ...this._mutations,
      ...this._subscriptions,
    ];

    this._queryType.addFields(...this._queries);
    this._mutationType.addFields(...this._mutations);
    this._subscriptionType.addFields(...this._subscriptions);

    this.populateFields(this._objectFields, "object");
    this.populateFields(this._interfaceFields, "interface");
    this.populateFields(this._inputFields, "input");

    this.copyTypes();
    this.resolveFieldsType();
    this.applyImplementations();
    this.applyInheritance();
    this.populateArgs();

    this.createResolver(this._queries);
    this.createResolver(this._mutations);
    this.createResolver(this._subscriptions);

    // Create resolver for fields of object types
    this._objectTypes.map((obj) => {
      const resolvableFields = obj.fields.filter((f) => f.resolver) as Field<
        any,
        ExtensionsType<ObjectFieldParams>
      >[];
      if (resolvableFields.length > 0) {
        this.addResolver(obj.classType);
        this.createResolver(resolvableFields);
      }
    });

    this.applyTypesModifiers();
    this.applyFieldModifiers();

    if (!this.isEmptyType(this._queryType)) {
      this._built.push(this._queryType);
    }

    if (!this.isEmptyType(this._mutationType)) {
      this._built.push(this._mutationType);
    }

    if (!this.isEmptyType(this._subscriptionType)) {
      this._built.push(this._subscriptionType);
    }

    this._built = [...this.built, ...this._allTypes].filter((t, index) => {
      if (t.extensions) {
        return !t.extensions?.decoratorInfos?.params?.hidden;
      }
      // Do not duplicate the type
      return this._built.indexOf(t) === index;
    });

    return this._built;
  }

  private addFieldWithoutDuplication(
    fields: GQLField<any, any, ExtensionsType<BuildingFieldParams>>[],
    field: GQLField<any, any, ExtensionsType<BuildingFieldParams>>,
  ) {
    const exists = fields.find((f) => {
      const fmeta = f.extensions as ExtensionsType;
      return (
        fmeta.decoratorInfos.key === field.extensions.decoratorInfos.key &&
        fmeta.decoratorInfos.classType ==
          field.extensions.decoratorInfos.classType
      );
    });
    if (!exists) {
      if (field instanceof InputField) {
        fields.push(field.copy());
      }
      if (field instanceof Field) {
        fields.push(field.copy());
      }
    }
  }

  private isEmptyType(t: GQLType) {
    return t.fields.length <= 0;
  }

  private applyFieldModifiers() {
    this._fieldModifiers.map((fm) => {
      const f = this._allFields.filter((f) => {
        return (
          fm.classType === f.extensions.decoratorInfos.classType &&
          fm.key === f.extensions.decoratorInfos.key
        );
      });
      f.map((f) => {
        fm.modifier(f);
      });
    });
  }

  private applyTypesModifiers() {
    this._typeModifiers.map((tm) => {
      const isResolver = this._resolvers.has(tm.classType);
      if (isResolver) {
        // If the class is decorated by @Resolver, apply to modifier to the fields of the class
        this._allFields.map((f) => {
          if (tm.classType === f.extensions.decoratorInfos.classType) {
            tm.fieldModifier(f);
          }
        });
      } else {
        const t = this._allTypes.filter((t) => {
          return (
            tm.classType === t.extensions.decoratorInfos.classType &&
            tm.key === t.extensions.decoratorInfos.key
          );
        });
        t.map((t) => {
          tm.modifier(t);
        });
      }
    });
  }

  private copyTypes() {
    this._typeCopiers.map((tc) => {
      const t = this._allTypes.filter((t) => {
        return (
          tc.classType === t.extensions.decoratorInfos.classType &&
          tc.key === t.extensions.decoratorInfos.key
        );
      });
      t.map((t) => {
        const res = tc.modifier(t);
        if (res) {
          if (!res.extensions.decoratorInfos.params.hidden) {
            this._built.push(res);
          }
        }
      });
    });
  }

  private applyImplementations() {
    this._objectTypes.map((t) => {
      const interfaces = t.extensions.decoratorInfos.params.implements;
      if (interfaces) {
        interfaces.map((i) => {
          if (i instanceof InterfaceType) {
            t.addInterfaces(i);
          } else {
            const linkedType = this._classTypeMap.get(i);
            if (linkedType?.interface) {
              t.addInterfaces(linkedType?.interface);
            }
          }
        });
      }
    });
  }

  private populateArgs() {
    this._allFields.map((f) => {
      if (f instanceof Field) {
        this._args.map((a) => {
          if (
            a.extensions.decoratorInfos.classType ===
              f.extensions.decoratorInfos.classType &&
            a.extensions.decoratorInfos.key === f.extensions.decoratorInfos.key
          ) {
            if (a.extensions.decoratorInfos.kind === "flat-args") {
              const t: InputType = this.resolveType(
                a.extensions.decoratorInfos as DecoratorInfos,
                "input",
              ) as any;
              if (t) {
                a.addArgs(...t.convert(Args).args);

                const typeRef = a.extensions.decoratorInfos.type();
                a.setClassType(typeRef);
                a.setName((typeRef as Function).name);
              }
              f.addArgs(a);
            } else {
              a.args.map((aChild) => {
                const t = this.resolveType(
                  a.extensions.decoratorInfos,
                  "input",
                );
                aChild.setType(t);
              });

              f.addArgs(a);
            }
          }
        });
      }
    });
  }

  private createResolver(
    fields: Field<any, ExtensionsType<BuildingFieldParams>>[],
  ) {
    fields.map((f) => {
      const resolver: ResolveFunction = async (args, gql, next) => {
        let finalArgs = [args];

        if (f.args.length <= 0) {
          finalArgs = [];
        }

        // find the index of the argument in the method
        if (f.args.length > 1 || !f.args[0]?.classType) {
          finalArgs = Object.keys(args).reduce((prev, key) => {
            const found = f.args.find((a) => a.name === key) as Args<
              any,
              ExtensionsType
            >;
            if (!found) {
              throw new Error(
                `Argument: ${key} not found in the while querying field: ${f.extensions.decoratorInfos.classType.name} ${f.extensions.decoratorInfos.key}`,
              );
            }
            prev[found.extensions.decoratorInfos.index] = args[key];
            return prev;
          }, []);
        }

        return await instance[f.extensions.decoratorInfos.key].bind(instance)(
          ...finalArgs,
          gql,
          next,
        );
      };

      const instance = this._store.getInstance(
        f.extensions.decoratorInfos.classType,
      );
      const t = this.resolveType(f.extensions.decoratorInfos, "object");
      f.setResolver(resolver);
      f.setType(t);
    });
  }

  private resolveFieldsType() {
    this._allTypes.map((typeDef) => {
      typeDef.fields.map((f: GQLField<any, any, ExtensionsType>) => {
        const t = this.resolveType(
          f.extensions.decoratorInfos,
          typeDef.extensions.decoratorInfos.kind,
        );
        f.setType(t);

        if (typeDef.extensions.decoratorInfos.params.nullable) {
          f.nullable();
        }
        if (typeDef.extensions.decoratorInfos.params.required) {
          f.required();
        }
      });
    });
  }

  private resolveType(
    extensions: DecoratorInfos<ObjectFieldParams>,
    typeKind: Kind,
  ): FieldType {
    const typeRef: any = extensions.type();

    if (typeRef instanceof UnionType) {
      // if the union type isn't already compiled,
      // convert the union classes into the corresponding object types
      if (!this._built.includes(typeRef)) {
        const newTypes: ObjectType[] = [];
        typeRef.types.map((t) => {
          if (t instanceof ObjectType) {
            newTypes.push(t);
          } else {
            const found = this._classTypeMap.get(t);
            if (found?.object) {
              newTypes.push(found?.object);
            } else {
              throw new Error(
                `Union: ${typeRef.name} Cannot find object type for class ${t.name}, try to decorate the class with @ObjectType`,
              );
            }
          }
        });

        typeRef.setTypes(...newTypes);
        this._built.push(typeRef);
      }
    }

    if (typeRef instanceof EnumType) {
      this._built.push(typeRef);
    }

    const t = TypeParser.parse(typeRef as any);

    // If the type is a relation to a ClassType:
    if (!t) {
      if (Array.isArray(typeRef)) {
        const t = this.resolveType(
          {
            ...extensions,
            type: () => typeRef[0],
          },
          typeKind,
        );
        return [t];
      }

      const resolveNullable = {
        ...extensions,
        type: () => typeRef.type,
      };
      if (typeRef instanceof NullableType) {
        const t = this.resolveType(resolveNullable, typeKind);
        return N(t);
      }
      if (typeRef instanceof RequiredType) {
        const t = this.resolveType(resolveNullable, typeKind);
        return R(t);
      }

      const relationTypes = this._classTypeMap.get(typeRef as Function);
      if (relationTypes) {
        let relationTypeStr: Kind = typeKind;

        if (extensions.params.relationType) {
          switch (extensions.params.relationType) {
            case InputType:
              if (typeKind === "input") {
                relationTypeStr = "input";
              }
              break;
            case ObjectType:
              if (typeKind !== "input") {
                relationTypeStr = "object";
              }
              break;
            case InterfaceType:
              if (typeKind !== "input") {
                relationTypeStr = "interface";
              }
              break;
          }
        }

        let relationType = relationTypes[relationTypeStr];

        // Add a fallback to type
        // "interface" =x=> "interface" ... "interface" => "object"
        // "object" =x=> "object" ... "object" => "interface"
        if (!relationType) {
          if (relationTypeStr === "interface") {
            relationType = relationTypes.object;
          }
          if (relationTypeStr === "object") {
            relationType = relationTypes.interface;
          }
        }

        if (relationType) {
          return relationType;
        } else {
          throw new Error(
            `Cannot resolve the relation type of field: ${extensions.classType.name}.${extensions.key}, you maybe missed a decorator on the class that correspond to the type`,
          );
        }
      }
    }

    return typeRef;
  }

  private populateFields(
    fields: GQLField<any, any, ExtensionsType>[],
    key: Kind,
  ) {
    fields.map((f) => {
      const t: GQLType<
        any,
        any,
        ExtensionsType<TypeParams>
      > = this._classTypeMap.get(f.extensions.decoratorInfos.classType)?.[key];
      if (t) {
        t.addFields(f);
      }
    });
  }

  private applyInheritance() {
    const apply = (t: GQLType<any, any, ExtensionsType>, sup: GQLType) => {
      sup.fields.map((f: GQLField<any, any, ExtensionsType>) => {
        // A class who inherit from an another one can override the field definition
        const exists = t.fields.find(
          (tf: GQLField<any, any, ExtensionsType>) =>
            tf.extensions.decoratorInfos.key ===
            f.extensions.decoratorInfos.key,
        );
        if (!exists) {
          t.addFields(f);
        }
      });

      if (t instanceof ObjectType && sup instanceof ObjectType) {
        t.addInterfaces(...sup.interfaces);
      }
    };

    this._allTypes.map((t) => {
      const applyFromClass = (superClass: Function) => {
        const allTypes = this._classTypeMap.get(superClass);
        if (allTypes) {
          const superType = allTypes[t.extensions.decoratorInfos.kind];

          if (superType) {
            apply(t, superType);
            return true;
          } else {
            console.warn(
              `class: ${t.extensions.decoratorInfos.classType.name} (${t.extensions.decoratorInfos.kind}) cannot ihnerit the class ${superClass.name} because they aren't decorated by the same type decorator`,
            );
          }
        }
        return false;
      };

      const superClass = Object.getPrototypeOf(
        t.extensions.decoratorInfos.classType,
      );
      if (!applyFromClass(superClass)) {
        const extendsType = t.extensions.decoratorInfos.params.extends;
        if (extendsType) {
          if (extendsType instanceof GQLType) {
            apply(t, extendsType);
          } else {
            applyFromClass(extendsType);
          }
        }
      }
    });
  }
}
