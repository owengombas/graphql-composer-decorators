# Enum type
Il existe dans GraphQL des types `enum`, cependant ceux-ci ne supportent pas les décorateurs avec TypeScript. Cela implique qu'il faille utiliser une façon alternative de les déclarer pour `graphql-composer`.

# Le créateur d'`EnumType`
Grâce à la class `EnumType` fournie par `graphql-composer` vous pouvez créer un type GraphQL `enum` en passant votre `enum` TypeScript en paramètre.  

## Déclaration du type
En premier paramètre vous devez donner le nom du type GraphQL et en deuxième l'enum.

```ts
import { EnumType } from "graphql-composer";

enum Animal {
  CAT = 1,
  COW = 2,
}

const animalEnum = EnumType.create("AnimalEnum", Animal)
```

## Utilisation du type
Pour typer vos champs de class TypeScript vous utiliserez donc `Animal` et pour type les champs GraphQL ça sera la variable `animalEnum` qui sera utilisée.

```ts
@ObjectType()
class User {
  @Field(type => animalEnum)
  pet: Animal
}
```