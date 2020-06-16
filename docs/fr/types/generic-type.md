# Les types génériques
Il sera certainement très utile dans votre application d'utiliser des types génériques.
Prenons l'exemple d'une réponse de liste à une requête dans laquelle vous envoyer tous les items via une liste du type de l'item (`items`) ainsi que la taille de la liste (`count`).  
*Sous forme de class:*
```ts
class Response<Type> {
  items: Type;
  count: Number;
}
```

Pour faire ceci avec les décorateurs nous devons utiliser une méthode peu commune: une fonction retournant une class !

## Processus de création d'un type générique

### Déclaration de la class de base
Uniquement le champ number est décoré, car les items n'ont pas de type déterminé à cet instant.
> La classe est en hidden, car elle sert de modèle pour les types qui vont être créés à partir de celle-ci.  
```ts
@ObjectType({ hidden: true })
abstract class GenericResponse<Type> {
  @Field()
  count: Number;
  items: Type[];
}
```

### Déclaration du créateur de type
Vous allez devoir utiliser la **valeur** de la class passé en paramètre pour le décorateur `@Field` et le **type** passé par paramètre générique à la fonction pour déclarer le type du champ de la class.
```ts
import { ClassType } from "graphql-composer";

function createResponse<ItemsType extends ClassType>(itemsType: ItemsType) {
  @ObjectType()
  class Response extends GenericResponse<ItemsType> {
    @Field(type => [itemsType])
    items: ItemsType[]
  }

  return Response as ClassType;
}
```

Enfin pour utiliser notre type générique:
```ts
@ObjectType()
class User {
  @Field()
  username: string;

  @Field()
  email: string;
}

const userResponse = createResponse(User);

@Resolver()
class R {
  @Query(type => userResponse)
  query(): GenericResponse<User> {
    // ...
  }
}
