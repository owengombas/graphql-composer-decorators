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

# Paramètres
`@InputType` a plusieurs signatures disponibles permettant de paramétrer votre objet:

## `name`
Indique le nom du type compilé en SDL.

## `params`
Un objet acceptant plusieurs paramètres:
| | description | type |
|-|-|-|
| hidden | La classe ne sera pas compilé et n'apparaîtra pas dans le schema (utile pour les type génériques), une classe abstraite est en principe `hidden` | `boolean` |
| nullable | Tout les champs du type serons nullable | `boolean` |
| required | Tout les champs du type seront requis | `boolean` |
| description | La description du type | `string` |
| extensions | Les extensions (métadonnées) du type | `any` |
| directives | Les directives du type | `{name: string, args: KeyValue}[]` |

# Utilisation avec `@Args` (et `@Arg`)
Il y'a deux façon d'utiliser votre type comme argument:
## Avec `@Arg`
Fonctionne de la même façon avec tout les types
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
## Avec `@Args`
Il est également très utile de pouvoir utiliser une classe pour déclarer tout les arguments d'un coup (poser les argument à plat) avec `@Args`.
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
