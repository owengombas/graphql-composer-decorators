# Description
Vous pouvez assigner une raison de déprécation grâce aux paramètres via tous les décorateurs de champs GraphQL (`@Field`, `@InputField`, ...). Cependant si vous voulez ajouter une raison de déprécation commune pour tous les types, ou tous les champs, il est plus pratique de passer par `@Deprecated`.  

## Utilisation de `@Deprecated`
`type User` et `input UserInput` auront la même raison de déprécation:
```ts
@Deprecated("Type deprecated")
@ObjectType()
@InputType("UserInput")
class User {
  @Description("Field deprecated")
  @ObjectField()
  @InputField()
  username: string;
}
```

## Utilisation de la déprécation de façon distincte
Ceci se fait via les paramètres des décorateurs d'éléments
```ts
@ObjectType({ deprecationReason: "User object deprecated" })
@InputType("UserInput", { deprecationReason: "User input deprecated" })
class User {
  @ObjectField({ deprecationReason: "User object field deprecated" })
  @InputField({ deprecationReason: "User input field deprecated" })
  username: string;
}
```
