# `InputType`
**Un `InputType` correspond à la déclaration: `input` avec GraphQL (en SDL)**
```ts
@InputType()
class User {
  @Field()
  email: string;

  @Field()
  username: string;
}
```
Donnera en SDL:
```graphql
input User {
  email: String
  username: String
}
```

## Paramètres
`@InputType` a plusieurs signatures disponibles permettant de paramétrer votre objet:

### `name`
Indique le nom du type compilé en SDL.

### `params`
Un objet acceptant plusieurs paramètres:
| Propriété | description | type |
|-|-|-|
| hidden | La classe ne sera pas compilée et n'apparaîtra pas dans le schéma (utile pour les types génériques), une classe abstraite est en principe `hidden` | `boolean` |
| nullable | Tous les champs du type seront nullable | `boolean` |
| required | Tous les champs du type seront requis | `boolean` |
| description | La description du type | `string` |
| extensions | Les extensions (métadonnées) du type | `any` |
| directives | Les directives du type | `{name: string, args: KeyValue}[]` |
| extends | Appliquer l'héritage de façon forcé | `(ClassType | ObjectType | InterfaceType | InputType)[]` (*Une class* ou *un type déclaré avec `graphql-composer`*)[] |

## `@InputField`
Le décorateur `@InputField` va indiquer les paramètres du champ seulement pour `@InputType`.  

Ceci est utile lorsque vous utiliser une class en tant que que plusieurs types GraphQL (`type`, `input` ou/et `interface`), en la décorant simultanément de `@ObjectType` et `@InputType` par exemple.  

Car `@Field` paramètre le champ pour tous les types GraphQL dont la class est décorée.
> `@InputField` override les paramètres de `@Field`.
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


## Utilisation avec `@Args` (et `@Arg`)
Il y'a deux façons d'utiliser votre type comme argument:

### Avec `@Arg`
Fonctionne de la même façon avec tous les types
```ts
@Resolver()
class Resolver {
  @Query()
  user(@Arg("user") user: User): Boolean {
    // ...
  }
}
```
Donnera en SDL:  
```graphql
input User {
  email: String
  username: String
}

input Query {
  user(user: User): Boolean
}
```

### Avec `@Args`
Il est également très utile de pouvoir utiliser une classe pour déclarer tout les arguments d'un coup (poser les arguments à plat) avec `@Args`.
> Fonctionne uniquement avec les `InputType`
```ts
@Resolver()
class Resolver {
  @Query()
  user(@Args() user: User): Boolean {
    // ...
  }
}
```
Donnera en SDL:  
```graphql
input User {
  email: String
  username: String
}

input Query {
  user(email: String, username: String): Boolean
}
```
