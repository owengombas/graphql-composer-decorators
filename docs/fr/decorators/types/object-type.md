# `ObjectType`
**Un `ObjectType` correspond à la déclaration: `type` avec GraphQL (en SDL)**

```ts
@ObjectType()
class User {
  @Field()
  email: string;

  @Field()
  username: string;
}
```

Donnera en SDL:
```graphql
type User {
  email: String
  username: String
}
```

## Paramètres
`@ObjectType` a plusieurs signatures disponibles permettant de paramétrer votre objet:

### `name`
Indique le nom du type compilé en SDL.
```ts
@ObjectType("UserType")
class User {
  Field()
  username: string;
}
```

Donnera en SDL:
```graphql
type UserType {
  username: String;
}
```

### `params`
Un objet acceptant plusieurs paramètres:
| Propriété | description | type |
|-|-|-|
| hidden | La classe ne sera pas compilée et n'apparaîtra pas dans le schéma (utile pour les types génériques), une classe abstraite est en principe `hidden` | `boolean` |
| nullable | Tous les champs du type seront nullable | `boolean` |
| required | Tous les champs du type seront requis | `boolean` |
| implements | Implémente une interface (GraphQL) | `(ClassType | InterfaceType)[]` (*Une class* ou *une interface déclarée avec `graphql-composer`*)[] |
| description | La description du type | `string` |
| extensions | Les extensions (métadonnées) du type | `any` |
| directives | Les directives du type | `{name: string, args: KeyValue}[]` |
| extends | Appliquer l'héritage de façon forcé | `(ClassType | ObjectType | InterfaceType | InputType)[]` (*Une class* ou *un type déclaré avec `graphql-composer`*)[] |

## `@ObjectField`
Le décorateur `@ObjectField` va indiquer les paramètres du champ seulement pour `@ObjectType`.  

Ceci est utile lorsque vous utiliser une class en tant que que plusieurs types GraphQL (`type`, `input` ou/et `interface`), en la décorant simultanément de `@ObjectType` et `@InputType` par exemple.  

Car `@Field` paramètre le champ pour tous les types GraphQL dont la class est décorée.
> `@ObjectField` override les paramètres de `@Field`.
```ts
@ObjectType()
@InputType("UserInput")
class User {
  @Field(type => R(String))
  @ObjectField()
  username: string;

  @InputField(type => R(String))
  @ObjectField()
  name: string;

  @Field()
  email: string;

  @InputField()
  password: string;
}
```

Donnera en SDL:
```graphql
type User {
  username: String;
  name: String;
  email: String;
}

input UserInput {
  username: String!;
  name: String!;
  email: String;
  password: String;
}
```

## Resolvable field
Avec GraphQL un champ d'un type peut accepter des arguments et une fonction retournant une valeur.
Comme ce type par exemple:
```graphql
type User {
  birthdate(format: String!): String!
}
```
Pour faire ceci, il vous suffit d'implémenter une méthode décorée de `@Field` dans votre class.
```ts
@ObjectType()
class User {
  @Field()
  // or @ObjectField()
  birthDate(@Arg("birthdate") birthdate: string): string {
    // ...
  }
}
```

## Les middlewares
L'[utilisation des middlewares](/fr/queries/middlewares) sur l'ensemble de la class et sur les champs est possible.
