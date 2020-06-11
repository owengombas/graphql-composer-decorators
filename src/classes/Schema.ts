import * as Glob from "glob";
import {
  Schema as GQLComposerSchema,
  GQLAnyType,
  Wrapper,
} from "graphql-composer";
import { MetadataStorage } from "..";

export type LoadClass = string | Function;

export class Schema extends GQLComposerSchema {
  private _loadClasses: LoadClass[] = [];

  load(...classes: LoadClass[]) {
    this._loadClasses = classes;
    this.loadClasses();
    return this;
  }

  build() {
    this.addTypes(...MetadataStorage.instance.build());
    super.build();

    return this.built;
  }

  static create(...types: (GQLAnyType | Wrapper)[]) {
    const schema = new Schema();
    schema.setTypes(...types);
    return schema;
  }

  private loadClasses() {
    if (this._loadClasses) {
      this._loadClasses.map((file) => {
        if (typeof file === "string") {
          const files = Glob.sync(file);
          files.map((file) => {
            require(file);
          });
        }
      });
    }
  }
}
