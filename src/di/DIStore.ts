import { ClassType, InstanceOf } from "graphql-composer";

export class DIStore<TKeyType = any, TInstanceType = any> {
  private static _global: DIStore;

  static get global() {
    if (!this._global) {
      this._global = new DIStore();
    }
    return this._global;
  }

  private _instances: Map<
    TKeyType,
    InstanceType<ClassType<TInstanceType>>
  > = new Map();

  createInstance<Type extends TInstanceType>(
    classType: ClassType<Type>,
    id?: any,
  ): Type {
    const instance = new classType();
    return this.addInstance(instance, id || classType);
  }

  addInstance<Type extends TInstanceType>(
    instance: InstanceType<ClassType<Type>>,
    id?: any,
    force = false,
  ): Type {
    const key = id || instance;
    const found = this._instances.get(key);
    let newInstance: Type = found as any;

    if (!found || force) {
      this._instances.set(key, instance);
      newInstance = instance;
    }

    return newInstance;
  }

  getInstance<Type extends TInstanceType>(
    idOrInstance: ClassType<Type> | any,
  ): Type {
    const found = this._instances.get(idOrInstance as any);
    return found as any;
  }
}
