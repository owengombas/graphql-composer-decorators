# L'héritage
L'héritage est naturellement supporté par `graphql-composer-decorators`, lorsque vous allez utiliser le mot clé `extends`, il va déterminer le type de la classé hérité et récupérer son type GraphQL et ajouter les champs au type héritant.

> L'héritage n'est pas nativement pris en charge par GraphQL, `graphql-composer-decorators` se charge alors de copier les champs.

## Exemple d'héritage
Les deux class doivent être décoré du même type GraphQL pour pouvoir utiliser l'héritage (ici `@ObjectType` et `@InputType`).
```ts
@ObjectType()
@InputType("AnimalInput")
class Animal {
  @Field()
  name: string;
}

@ObjectType()
@InputType("CatInput")
class Cat extends Animal {
  @Field()
  meow: string;
}
```

Donnera en SDL:
```graphql
type Animal {
  name: String
}

type Cat {
  name: String
  meow: String
}

input AnimalInput {
  name: String
}

input CatInput {
  name: String
  meow: String
}
```
