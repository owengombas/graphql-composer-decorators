import {
  Middlewares,
  ObjectType,
  Field,
  Resolver,
  Query,
  Extensions,
  Arg,
  Args,
  Schema,
  InputType,
  ObjectField,
  Mutation,
} from "../../src";
import { Context, Next } from "graphql-composer";
import { ApolloServer, gql } from "apollo-server";
import ApolloClient from "apollo-boost";
import fetch from "node-fetch";

const client = new ApolloClient({
  uri: "http://localhost:4002/graphql",
  fetch,
});

describe("Query", () => {
  it("Should parse the arguments and bind instance", async () => {
    @ObjectType()
    @InputType("UserInput")
    class User {
      @Field()
      username: string;
      binded = "binded";

      constructor(username: string) {
        this.username = username;
      }

      @ObjectField()
      hello(
        @Arg("name")
        name: string,
        @Arg("email")
        email: string,
        @Arg("user")
        user: User,
        @Args()
        userFlat: User,
        ctx: Context,
        next: Next,
      ): string {
        const usr = new User("username");

        expect(name).toBe("name");
        expect(email).toBe("email");
        expect(userFlat).toEqual(usr);
        expect(user).toEqual(usr);

        return userFlat.username;
      }
    }

    @Resolver()
    class R {
      binded = "binded";

      @Query()
      root(@Arg("username") username: string): User {
        expect(username).toBe("root");
        return new User(username);
      }

      @Mutation()
      query(
        @Arg("name")
        name: string,
        @Arg("email")
        email: string,
        @Arg("user")
        user: User,
        @Args()
        userFlat: User,
        ctx: Context,
        next: Next,
      ): User {
        const usr = new User("username");

        expect(name).toBe("name");
        expect(email).toBe("email");
        expect(userFlat).toEqual(usr);
        expect(user).toEqual(usr);

        return usr;
      }
    }

    const schema = Schema.create()
      .setConfig({ requiredByDefault: true })
      .load();
    const built = schema.build();
    const server = new ApolloServer({
      schema: built,
    });
    await server.listen(4002);

    await client.mutate({
      mutation: gql`
        mutation {
          query(
            name: "name"
            email: "email"
            username: "username"
            user: { username: "username" }
          ) {
            hello(
              name: "name"
              email: "email"
              username: "username"
              user: { username: "username" }
            )
          }
        }
      `,
    });

    await client.query({
      query: gql`
        query {
          root(username: "root") {
            username
          }
        }
      `,
    });

    await server.stop();
  });
});
