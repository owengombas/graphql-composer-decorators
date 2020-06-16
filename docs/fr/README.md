# `graphql-composer-decorators`
GraphQL est vient révolutionner le développement backend, le fait qu'il faille déclarer des types est quelque chose de très utile.  

Cependant cela peut entraîner une duplication du code et donc nuire à la stabilité de votre application. En effet en se basant sur le principe DRY (Don't Repeat Yourself) le fait de déclarer plusieurs fois un même élément de façon différente devrait être éviter car lorsque cet élément change il faut donc modifier plusieurs parties de code, ainsi si une seule de ces parties est omise cela peut engendrer des problèmes dans votre application et plus votre application grandie plus il sera dure de maintenir celle-ci.

# Mais TypeGraphQL existe déjà ?
`graphql-composer-decorators` diffère quelque peu de `typegraphql` les différences sont détaillés [ici](/typegraphql-comparison).

# Fonctionnement des décorateurs

## Inférence de type

### Expliciter le type
Un décorateur peut déterminer un type seulement si celui-ci est explicitement indiqué:
**Ceci ne fonctionnera pas:**
```ts
@ObjectType()
class User {
  @Field()
  username = "";
}
```
Mais ceci oui:
```ts
@ObjectType()
class User {
  @Field()
  username: string;
}
```

### Tableau
Un décorateur ne peut pas déterminer le type d'un tableau.
**Ceci ne fonctionnera pas**
```ts
@ObjectType()
class User {
  @Field()
  username: string[];
}
```
Vous devez alors indiquer le type grace au décorateur avec une syntaxe semblable:
> Il faut utiliser `String` (avec une majuscule) car c'est une class alors que `string` est un type et ne peut donc pas être passé en paramètre.
```ts
@ObjectType()
class User {
  @Field(type => [String])
  username: string[];
}
```

### Types génériques
Un décorateur comme pour les tableau (Au final cela revient au même car `type[]` équivaut à `Array<type>`), ne peut pas déterminer le type passé en paramètre d'un type générique.
**Ceci ne fonctionnera pas**
```ts
@ObjectType()
class User {
  @Field()
  sponsor: Partial<MyOtherType>;
}
```
Vous devez alors créer un type qui équivaut à `Partial<MyOtherType>`.
> Il y'a plusieurs façon de procéder, ceci est un cas simple. Mais le principe reste le même quelque soit la façon.
```ts
@ObjectType({ nullable: true })
class MyOtherType {
  // ...
}

@ObjectType()
class User {
  @Field(type => MyOtherType)
  sponsor: Partial<MyOtherType>;
}
```
