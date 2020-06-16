# Field

## `@Field`
Ce décorateur décrit un champ pour tous les types GraphQL (`interface`, `input`, ou `type`).
```ts
@ObjectType()
@InputType("InputInterface")
@InterfaceType("UserInterface")
class User {
  @Field()
  username: string;
}
```
Donnerait en SDL:
```graphql
type User {
  username: string;
}

interface UserInterface {
  username: string;
}

input UserInput {
  username: string;
}
```

## `@ObjectField`
Fonctionne exactement comme `@Field` excepté qu'il paramètre seulement le champ de `@ObjectType`.  
Son fonctionnement est détaillé sur la [page dédiée au type ObjectType](/fr/types/object-type#objectfield).
```ts
@ObjectType()
@InputType("InputInterface")
@InterfaceType("UserInterface")
class User {
  @ObjectField()
  username: string;
}
```
Donnerait en SDL:
```graphql
type User {
  username: string;
}

interface UserInterface {
}

input UserInput {
}
```

## `@InterfaceField`
Fonctionne exactement comme `@Field` excepté qu'il paramètre seulement le champ de `@InterfaceType`.  
Son fonctionnement est détaillé sur la [page dédiée au type InterfaceType](/fr/types/interface-type#interfacefield).
```ts
@ObjectType()
@InputType("InputInterface")
@InterfaceType("UserInterface")
class User {
  @InputField()
  username: string;
}
```
Donnerait en SDL:
```graphql
type User {
}

interface UserInterface {
  username: string;
}

input UserInput {
}
```

## `@InputField`
Fonctionne exactement comme `@Field` excepté qu'il paramètre seulement le champ de `@InputType`.  
Son fonctionnement est détaillé sur la [page dédiée au type InputType](/fr/types/input-type#inputfield).
```ts
@ObjectType()
@InputType("InputInterface")
@InterfaceType("UserInterface")
class User {
  @InputField()
  username: string;
}
```
Donnerait en SDL:
```graphql
type User {
}

interface UserInterface {
}

input UserInput {
  username: string;
}
```

## Paramètres de field
Les décorateurs de nature "field" possèdent toutes les mêmes signatures:
- `@Field`
- `@ObjectField`
- `@InputField`
- `@InterfaceField`
- `@Query`
- `@Mutation`
- `@Subscription` (`params.subscribe` requis)

### `name`
Vous pouvez changer le nom du champ GraphQL grâce à ce paramètre.
```ts
@ObjectType()
class User {
  @Field("userUsername")
  username: string;
}
```
Donnera en SDL:
```graphql
type User {
  userUsername: String
}
```

### `type`
Ce paramètre pâlit aux limitations de TypeScript.  
Il est nécessaire quand le type ne peut être inféré comme avec:
- Des dépendances circulaires (A dépend de B et B dépend de A)
- Des tableaux ([détails](/fr/#tableau))
- Des types génériques ([détails](#types-generiques))
- Des types qui diffèrent du type inféré (comme pour les [enum](/fr/types/enum-type) ou [union](/fr/types/union-type))
- Pour un champ nullable ou requis

```ts
@ObjectType()
class User {
  @Field(type => [String])
  username: string[];
}
```


