# Extensions
GraphQL ne traite pas de stratégie spécifique de mise en œuvre des directives, il appartient à chaque implémentation de serveur GraphQL d'exposer une API pour la mise en œuvre des nouvelles directives.
[Documentation relative aux directives avec Apollo](https://www.apollographql.com/docs/apollo-server/schema/creating-directives/)

Vous pouvez assigner les `directives` grâce aux paramètres via tous les décorateurs d'élément GraphQL (`@ObjectType`, `@InputType`, `@InterfaceType` `@Arg`, `@Field`, ...). Cependant si vous voulez assigner les `directives` de façon commune pour tous les types, ou tout les champs, il est plus pratique de passer par `@Directive`.  

## Utilisation de `@Directive`
Ceci se fait simplement en passant un objet au décorateur `@Extensions`
> Si vous voulez mettre plusieurs directives sur un élément, vous devrez utiliser plusieurs fois le décorateur
```ts
@ObjectType()
@InputType()
@Directive("upper")
@Directive("test", { class: "User" })
class User {
  @ObjectField()
  @InputField()
  @Directive("upper")
  username: string;
}
```

## Utilisation des directives de façon distincte
Ceci se fait via les paramètres des décorateurs d'éléments:
```ts
@ObjectType({
  directives: [
    { name: "upper" }
  ]
})
@InputType({
  directives: [
    {
      name: "upper",
      args: { class: "input-User" }
    }
  ]
})
class User {
  @ObjectField({
    directives: [
      { name: "upper-object" }
    ]
  })
  @InputField({
    directives: [
      { name: "upper-input" }
    ]
  })
  username: string;
}
```

