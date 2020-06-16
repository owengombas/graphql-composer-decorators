# Description
Vous pouvez assigner une description grâce aux paramètres via tous les décorateurs d'élément GraphQL (`@ObjectType`, `@InputType`, `@InterfaceType` `@Arg`, `@Field`, ...). Cependant si vous voulez ajouter une description commune pour tous les types, ou tous les champs, il est plus pratique de passer par `@Description`.  

## Description GraphQL
Vos éléments GraphQL (type, input, interface, champs, etc...) peuvent avoir une description:
```graphql
""My User type""
type User {
  ""His username""
  username: String
}
```

## Utilisation de `@Description`
`type User` et `input UserInput` auront la même description:
```ts
@Description("An user")
@ObjectType()
@InputType("UserInput")
class User {
  @Description("The username")
  @ObjectField()
  @InputField()
  username: string;
}
```
Donnera en SDL:
```graphql
""An user""
type User {
  ""The username""
  username: String;
}

""An user""
input UserInput {
  ""The username""
  username: String;
}
```

## Utilisation de description de façon distincte
Ceci se fait via les paramètres des décorateurs d'éléments
```ts
@ObjectType({ description: "User object" })
@InputType("UserInput", { description: "User input" })
class User {
  @ObjectField({ description: "User object field" })
  @InputField({ description: "User input field" })
  username: string;
}
```
Donnera en SDL:
```graphql
""User object""
type User {
  ""User object field""
  username: String;
}

""User input""
input UserInput {
  ""User input field""
  username: String;
}
```
