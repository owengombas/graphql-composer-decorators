# Installation
Simply by using `npm`:
```sh
npm i graphql-composer-decorators
```
Or `yarn`:
```sh
yarn add graphql-composer-decorators
```

## tsconfig.json
Create an `tsconfig` file in your root directory which should contain this:
> The `experimentalDecorators` and `emitDecoratorMetadata` must have the value: `true`.  
> If you wonder why "experimental"Decorators, the TypeScript documentation explains it [here](https://www.typescriptlang.org/docs/handbook/decorators.html) 
```json
{
  "CompileOptions": {
    "module": "commonjs",
    "target": "es2019",
    "noImplicitAny": false,
    "sourceMap": true,
    "outDir": "build",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "declaration": true,
    "importHelpers": true,
    "forceConsistentCasingInFileNames": true,
    "lib": [
      "ES2020."
      "ES2017."
      "esnext.asynciterable."
    ],
    "moduleResolution": "node"
  },
  "exclude": [
    "node_modules"
  ]
}

```
