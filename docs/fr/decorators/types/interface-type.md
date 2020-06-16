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

# Paramètres
`@InterfaceType` a plusieurs signatures disponibles permettant de paramétrer votre objet:

## `name`
Indique le nom du type compilé en SDL.

## `params`
Un objet acceptant plusieurs paramètres:
| | description | type |
|-|-|-|
| hidden | La classe ne sera pas compilé et n'apparaîtra pas dans le schema (utile pour les type génériques), une classe abstraite est en principe `hidden` | `boolean` |
| nullable | Tout les champs du type serons nullable | `boolean` |
| required | Tout les champs du type seront requis | `boolean` |
| typeResolver | Fonction déterminant la valeur de `__typename` | `GraphQLTypeResolver` |
| description | La description du type | `string` |
| extensions | Les extensions (métadonnées) du type | `any` |
| directives | Les directives du type | `{name: string, args: KeyValue}[]` |

# La fonction de `TypeResolver` (`__typename`)
Par défaut une fonction fonctionnant avec tout les types est écrite par `graphql-composer`, vous n'avez donc, pour de nombreux cas, pas besoin de donner une valeur à `params.typeResolver`.
> La fonction par défaut détermine le type via les propriétés de l'objet, mais de façon générale pour n'importe quel objet. Ceci s'applique également pour les `UnionType`
