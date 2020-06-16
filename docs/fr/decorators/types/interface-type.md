# `InterfaceType`
**Un `InterfaceType` correspond à la déclaration: `interface` avec GraphQL (en SDL)**
```ts
@InterfaceType()
class User {
  @Field()
  email: string;

  @Field()
  username: string;
}
```
Donnera en SDL:
```graphql
interface User {
  email: String
  username: String
}
```

## Paramètres
`@InterfaceType` a plusieurs signatures disponibles permettant de paramétrer votre objet:

### `name`
Indique le nom du type compilé en SDL.

### `params`
Un objet acceptant plusieurs paramètres:
| Propriété | description | type |
|-|-|-|
| hidden | La classe ne sera pas compilée et n'apparaîtra pas dans le schéma (utile pour les types génériques), une classe abstraite est en principe `hidden` | `boolean` |
| nullable | Tous les champs du type seront nullable | `boolean` |
| required | Tous les champs du type seront requis | `boolean` |
| typeResolver | Fonction déterminant la valeur de `__typename` | `GraphQLTypeResolver` |
| description | La description du type | `string` |
| extensions | Les extensions (métadonnées) du type | `any` |
| directives | Les directives du type | `{name: string, args: KeyValue}[]` |
| extends | Appliquer l'héritage de façon forcé | `(ClassType | ObjectType | InterfaceType | InputType)[]` (*Une class* ou *un type déclaré avec `graphql-composer`*)[] |

## `@InterfaceField`
Le décorateur `@InterfaceField` va indiquer les paramètres du champ seulement pour `@InterfaceType`.  

Ceci est utile lorsque vous utiliser une class en tant que que plusieurs types GraphQL (`type`, `input` ou/et `interface`), en la décorant simultanément de `@InterfaceType` et `@InputType` par exemple.  

Car `@Field` paramètre le champ pour tous les types GraphQL dont la class est décorée.
> `@InterfaceField` override les paramètres de `@Field`.
```ts
@InterfaceField()
@InputType("UserInput")
class User {
  @Field(type => R(String))
  @InterfaceField()
  username: string;

  @InputField(type => R(String))
  @InterfaceField()
  name: string;

  @Field()
  email: string;

  @InputField()
  password: string;
}
```

Donnera en SDL:
```graphql
interface User {
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

## La fonction de `TypeResolver` (`__typename`)
Par défaut une fonction fonctionnant avec tous les types est écrite par `graphql-composer`, vous n'avez donc, pour de nombreux cas, pas besoin de donner une valeur à `params.typeResolver`.
> La fonction par défaut détermine le type via les propriétés de l'objet, mais de façon générale pour n'importe quel objet. Ceci s'applique également pour les `UnionType.
Une fonction `GraphQLTypeResolver` peut ressembler à ça (dans un cas spécifique):
```ts
function typeResolver = (obj, context, info) => {
  if(obj.name){
    return "Author";
  }

  if(obj.title){
    return "Book";
  }

  return null;
}

@InterfaceType({
  typeResolver
})
class User {
  Field()
  username: string;
}
```
