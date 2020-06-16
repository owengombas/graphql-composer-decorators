# Installation
Simplement en utilisant `npm`:
```sh
npm i graphql-composer-decorators
```
Ou `yarn`:
```sh
yarn add graphql-composer-decorators
```

## tsconfig.json
Créer dans votre répertoire racine un fichier `tsconfig` qui devrait contenir ceci:
> `experimentalDecorators` et `emitDecoratorMetadata` doivent forcément être à `true`.  
> Si vous vous demander pourquoi les "experimental" Decorators, la documentation de TypeScript l'explique [ici](https://www.typescriptlang.org/docs/handbook/decorators.html) 
```json
{
  "compilerOptions": {
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
      "ES2020",
      "ES2017",
      "esnext.asynciterable"
    ],
    "moduleResolution": "node"
  },
  "exclude": [
    "node_modules"
  ]
}

```
