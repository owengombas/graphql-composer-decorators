# Union type
Les types union en GraphQL vous permettent de créer des types qui en regroupent plusieurs.
Prenons un exemple simple dans lequel une personne peut avoir un animal de compagnie, un chien **ou** un chat. (cet exemple est également faisable en utilisant les [interfaces](/graphql-composer-decorators/fr/types/interface-type)) >le mot **ou** n'est pas choisi au hasard, ceci décrit bien, ce que un type `union`.

Pour décrire cette situation avec GraphQL on utilisera donc les types `union`.
```graphql
type Dog {
  bark: String
}

type Cat {
  moew: String
}

union CatOrDog = Cat | Dog
```


En TypeScript ceci est faisable grâce à l'opérateur `|` (pipe) avec des types:
```ts
class Cat {
  meow: string;
}

class Dog {
  bark: string;
}

class User {
  pet: Cat | Dog;
}
```

## Création et utilisation d'une `union`
Les décorateurs, comme pour les types `enum`, ne peuvent pas déterminer les différents types d'une union TypeScript. Vous devrez alors utiliser la class `UnionType` fournie par `graphql-composer`.

### Déclaration d'une `union`
Reprenons notre exemple ci-dessus et ajoutons ce qu'il faut pour créer notre type `union`:
```ts
import { UnionType } from "graphql-composer";

@ObjectType()
class Cat {
  @Field()
  meow: string;
}

@ObjectType()
class Dog {
  @Field()
  bark: string;
}

const catOrDog = UnionType.create("CatOrDog", Cat, Dog)
```

### Utilisation d'une `union`
Ceci se fait de la même façon qu'un type [enum](/graphql-composer-decorators/fr/types/enum-type). Vous devez utiliser l'opérateur `|` (`Cat | Dog`) pour les types TypeScript et la variable `catOrDog` pour votre type GraphQL.

```ts
@ObjectType()
class Person {
  @Field(type => catOrDog)
  pet: Cat | Dog;
}
```
