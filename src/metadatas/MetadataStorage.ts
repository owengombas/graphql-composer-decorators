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
  Nullable,
  RequiredType,
  NullableType,
  Required,
  UnionType,
  GQLAnyType,
} from "graphql-composer";
import {
  Kind,
  MetaType,
  DIStore,
  FieldParams,
  ObjectTypeParams,
  TypeParams,
  BuildingFieldParams,
  Modifier,
} from "..";
import { FieldModifier, TypeModifier } from "../types";

export type TypeMap = {
  interface?: InterfaceType<any, MetaType>;
  input?: InputType<any, MetaType>;
  object?: ObjectType<any, MetaType>;
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
    MetaType<ObjectTypeParams>
  >;
  private _mutationType = ObjectType.create("Mutation") as ObjectType<
    any,
    MetaType<ObjectTypeParams>
  >;
  private _subscriptionType = ObjectType.create("Subscription") as ObjectType<
    any,
    MetaType<ObjectTypeParams>
  >;

  private _queries: Field<any, MetaType<BuildingFieldParams>>[] = [];
  private _mutations: Field<any, MetaType<BuildingFieldParams>>[] = [];
  private _subscriptions: Field<any, MetaType<BuildingFieldParams>>[] = [];

  private _allTypes: GQLType<any, any, MetaType<TypeParams>>[] = [];
  private _objectTypes: ObjectType<any, MetaType<ObjectTypeParams>>[] = [];
  private _inputTypes: InputType<any, MetaType<TypeParams>>[] = [];
  private _interfaceTypes: InterfaceType<any, MetaType<TypeParams>>[] = [];
  private _classTypeMap: Map<Function, TypeMap> = new Map();

  private _allFields: GQLField<any, any, MetaType<BuildingFieldParams>>[] = [];
  private _fields: Field<any, MetaType<BuildingFieldParams>>[] = [];
  private _objectFields: Field<any, MetaType<BuildingFieldParams>>[] = [];
  private _inputFields: InputField<any, MetaType<BuildingFieldParams>>[] = [];
  private _interfaceFields: Field<any, MetaType<BuildingFieldParams>>[] = [];

  private _fieldModifiers: Modifier<FieldModifier>[] = [];
  private _typeModifiers: Modifier<TypeModifier>[] = [];

  private _args: Args<any, MetaType<FieldParams>>[] = [];

  private _built: GQLAnyType<any, MetaType>[] = [];

  get built() {
    return this._built;
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

  addResolver<T extends ClassType = any>(item: T) {
    this._store.createInstance(item);
  }

  build() {
    this._allTypes = [
      ...this._objectTypes,
      ...this._interfaceTypes,
      ...this._inputTypes,
    ];

    this._allFields = [
      ...this._fields,
      ...this._objectFields,
      ...this._interfaceFields,
      ...this._inputFields,
      ...this._queries,
      ...this._mutations,
      ...this._subscriptions,
    ];

    // Create type map
    this._allTypes.map((t) => {
      const el = this._classTypeMap.get(t.meta.classType);
      const value = el || {};

      value[t.meta.kind] = t;

      this._classTypeMap.set(t.meta.classType, value);
    });

    this.populateFields(this._objectFields, "object");
    this.populateFields(this._interfaceFields, "interface");
    this.populateFields(this._inputFields, "input");

    this._fields.map((f) => {
      this.addFieldWithoutDuplication(this._objectFields, f);
      this.addFieldWithoutDuplication(this._interfaceFields, f);
      this.addFieldWithoutDuplication(
        this._inputFields,
        f.convert(InputField) as any,
      );
    });

    this.resolveFieldsType();
    this.applyIhneritanceToTypes();
    this.applyImplementations();
    this.populateArgs();

    this.applyTypesModifiers();
    this.applyFieldModifiers();

    this.createResolver(this._queries, this._queryType);
    this.createResolver(this._mutations, this._mutationType);
    this.createResolver(this._subscriptions, this._subscriptionType);

    this._built = [this._queryType, ...this._allTypes, ...this.built].filter(
      (t) => {
        if (t.meta) {
          return !t.meta.params.hidden;
        }
        return true;
      },
    );

    if (!this.isEmptyType(this._mutationType)) {
      this._built.push(this._mutationType);
    }

    if (!this.isEmptyType(this._subscriptionType)) {
      this._built.push(this._subscriptionType);
    }

    return this._built;
  }

  private addFieldWithoutDuplication(
    fields: GQLField<any, any, MetaType<FieldParams>>[],
    field: GQLField<any, any, MetaType<FieldParams>>,
  ) {
    const exists = fields.find((f) => {
      return (f.meta as MetaType).key === field.meta.key;
    });
    if (!exists) {
      fields.push(field);
    }
  }

  private isEmptyType(t: GQLType) {
    return t.fields.length <= 0;
  }

  private applyFieldModifiers() {
    this._fieldModifiers.map((fm) => {
      const f = this._allFields.find((f) => {
        return fm.classType === f.meta.classType && fm.key === f.meta.key;
      });
      if (f) {
        fm.modifier(f);
      }
    });
  }

  private applyTypesModifiers() {
    this._typeModifiers.map((tm) => {
      const t = this._allTypes.find((t) => {
        return tm.classType === t.meta.classType && tm.key === t.meta.key;
      });
      if (t) {
        tm.modifier(t);
      }
    });
  }

  private applyImplementations() {
    this._objectTypes.map((t) => {
      const interfaces = t.meta.params.implements;
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
    const allFields = [
      ...this._fields,
      ...this._subscriptions,
      ...this._queries,
      ...this._mutations,
    ];

    allFields.map((f) => {
      this._args.map((a) => {
        if (
          a.meta.classType === f.meta.classType &&
          a.meta.key === f.meta.key
        ) {
          if (a.meta.kind === "flat-args") {
            const t: InputType = this.resolveType(
              a.meta as MetaType,
              "input",
            ) as any;
            if (t) {
              a.addArgs(...t.convert(Args).args);

              const typeRef = a.meta.type();
              a.setClassType(typeRef);
              a.setName((typeRef as Function).name);
            }
            f.addArgs(a);
          } else {
            a.args.map((aChild) => {
              const t = this.resolveType(a.meta as MetaType, "input");
              aChild.setType(t);
            });

            f.addArgs(a);
          }
        }
      });
    });
  }

  private createResolver(
    fields: Field<any, MetaType<BuildingFieldParams>>[],
    type: ObjectType<any, MetaType>,
  ) {
    fields.map((f) => {
      const resolver: ResolveFunction = (args, gql, next) => {
        let finalArgs = [args];

        if (f.args.length > 1) {
          finalArgs = Object.keys(args).reduce((prev, key) => {
            const found = f.args.find((a) => a.name === key);
            if (!found) {
              throw new Error(
                `Argument: ${key} not found in the while querying field: ${f.meta.classType.name} ${f.meta.key}`,
              );
            }
            prev[found.meta.index] = args[key];
            return prev;
          }, []);
        }

        instance[f.meta.key].bind(instance)(...finalArgs, gql, next);
      };

      const instance = this._store.getInstance(f.meta.classType);
      const t = this.resolveType(f.meta, "object");
      f.setResolver(resolver);
      f.setType(t);

      type.addFields(f);
    });
  }

  private resolveFieldsType() {
    this._allTypes.map((typeDef) => {
      typeDef.fields.map((f) => {
        const t = this.resolveType(f.meta as MetaType, typeDef.meta.kind);
        f.setType(t);

        if (typeDef.meta.params.partial) {
          f.nullable();
        }
        if (typeDef.meta.params.required) {
          f.required();
        }
      });
    });
  }

  private resolveType(meta: MetaType<FieldParams>, typeKind: Kind) {
    let res: FieldType;
    let typeRef: any = meta.type();

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

      return typeRef;
    }

    const t = TypeParser.parse(typeRef as any);

    if (!t) {
      let nullable: typeof NullableType | typeof RequiredType = undefined;
      if (typeRef instanceof NullableType) {
        nullable = NullableType;
        typeRef = typeRef.type;
      }
      if (typeRef instanceof RequiredType) {
        nullable = RequiredType;
        typeRef = typeRef.type;
      }

      const relationTypes = this._classTypeMap.get(typeRef as Function);
      if (relationTypes) {
        let relationTypeStr: Kind = typeKind;

        switch (meta.params.relationType) {
          case InputType:
            relationTypeStr = "input";
            break;
          case ObjectType:
            relationTypeStr = "object";
            break;
          case InterfaceType:
            relationTypeStr = "interface";
            break;
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
          switch (nullable) {
            case RequiredType:
              relationType = Required(relationType);
              break;
            case NullableType:
              relationType = Nullable(relationType);
              break;
          }
          res = relationType as any;
        } else {
          throw new Error(
            `Cannot resolve the relation type of field: ${meta.classType}.${meta.key}, you maybe missed a decorator on the class that correspond to the type`,
          );
        }
      } else {
        res = typeRef;
      }
    } else {
      res = typeRef;
    }

    if (!res) {
      throw new Error(
        `Cannot resolve the type of field: ${meta.classType}.${meta.key}`,
      );
    }

    return res;
  }

  private populateFields(fields: GQLField[], key: Kind) {
    fields.map((f) => {
      const t: GQLType<any, any, MetaType<TypeParams>> = this._classTypeMap.get(
        f.meta.classType,
      )?.[key];
      if (t) {
        t.addFields(f);
      }
    });
  }

  private applyIhneritanceToTypes() {
    this._allTypes.map((t) => {
      this.applyIhneritance(t);
    });
  }

  private applyIhneritance(t: GQLType<any, any, MetaType>) {
    const apply = (t: GQLType, sup: GQLType) => {
      t.addFields(...sup.fields);

      if (t instanceof ObjectType && sup instanceof ObjectType) {
        t.addInterfaces(...sup.interfaces);
      }
    };

    const applyFromClass = (superClass: Function) => {
      const allTypes = this._classTypeMap.get(superClass);
      if (allTypes) {
        const superType = allTypes[t.meta.kind];

        if (superType) {
          apply(t, superType);
          return true;
        } else {
          console.warn(
            `class: ${t.meta.classType.name} (${t.meta.kind}) cannot ihnerit the class ${superClass.name} because they aren't decorated by the same type decorator`,
          );
        }
      }
      return false;
    };

    const superClass = Object.getPrototypeOf(t.meta.classType);
    if (!applyFromClass(superClass)) {
      const extendsType = t.meta.params.extends;
      if (extendsType) {
        if (extendsType instanceof GQLType) {
          apply(t, extendsType);
        } else {
          applyFromClass(extendsType);
        }
      }
    }
  }
}
