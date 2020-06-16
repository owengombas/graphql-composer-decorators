# Extensions
Les extensions vous permettent de lier des données à vos éléments GraphQL (type, input, interface, champs, etc...).

Ceci peut être très utile dans certains cas, si vous voulez par exemple créer un CMS, cela pourrait requérir d'avoir des métadonnées sur vos champs.

Vous pouvez assigner `extensions` grâce aux paramètres via tous les décorateurs d'élément GraphQL (`@ObjectType`, `@InputType`, `@InterfaceType` `@Arg`, `@Field`, ...). Cependant si vous voulez assigner `extensions` de façon commune pour tous les types, ou tout les champs, il est plus pratique de passer par `@Extensions`.  

## Utilisation de `@Extensions`
Ceci se fait simplement en passant un objet au décorateur `@Extensions`
```ts
@ObjectType()
@InputType()
@Extensions({ type: "class" })
class User {
  @ObjectField()
  @InputField()
  @Extensions({ type: "short-text" })
  username: string;
}
```

## Utilisation des extensions de façon distincte
Ceci se fait via les paramètres des décorateurs d'éléments:
```ts
@ObjectType({ type: "object-class" })
@InputType({ type: "input-class" })
class User {
  @ObjectField({ type: "object-short-text" })
  @InputField({ type: "input-short-text" })
  username: string;
}
```
