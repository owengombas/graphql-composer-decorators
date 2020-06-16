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
} from "../../src";
import { Context, Next } from "graphql-composer";
import { ApolloServer, gql } from "apollo-server";
import ApolloClient from "apollo-boost";
import fetch from "node-fetch";

const client = new ApolloClient({
  uri: "http://localhost:4002/graphql",
  fetch,
});

describe("Middlewares", () => {
  it("Should apply middlewares to ObjectType and resolvers", async () => {
    @ObjectType()
    @InputType("UserInput")
    @Middlewares(
      async (args, ctx, next) => {
        expect(ctx.body).toBeUndefined();
        ctx.body = "";
        await next();
      },
      async (args, ctx, next) => {
        expect(ctx.body).toBe("");
        ctx.body = "_";
        await next();
      },
    )
    class User {
      @Field()
      username: string;
      binded = "binded";

      constructor(username: string) {
        this.username = username;
      }

      @ObjectField()
      @Middlewares(
        async (args, ctx, next) => {
          expect(ctx.body).toBe("_");
          ctx.body += "mw";
          await next();
        },
        async (args, ctx, next) => {
          expect(ctx.body).toBe("_mw");
          ctx.body += "_";
          await next();
        },
      )
      mw(ctx): string {
        expect(ctx.body).toBe("_mw_");
        return "hello";
      }

      @ObjectField()
      @Middlewares(async (args, ctx, next) => {
        expect(ctx.body).toBe("_");
        ctx.body += "hello";
        await next();
      })
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
      ): string {
        expect(ctx.body).toBe("_hello");
        return;
      }
    }

    @Resolver()
    @Middlewares(
      async (args, ctx, next) => {
        expect(ctx.body).toBeUndefined();
        ctx.body = "";
        await next();
      },
      async (args, ctx, next) => {
        expect(ctx.body).toBe("");
        ctx.body = "_";
        await next();
      },
    )
    class R {
      binded = "binded";

      @Query()
      @Middlewares(
        async (args, ctx, next) => {
          expect(ctx.body).toBe("_");
          ctx.body += "mw";
          await next();
        },
        async (args, ctx, next) => {
          expect(ctx.body).toBe("_mw");
          ctx.body += "_";
          await next();
        },
      )
      root(@Arg("username") username: string, ctx: Context): User {
        expect(ctx.body).toBe("_mw_");
        return new User(username);
      }

      @Query()
      @Middlewares(
        async (args, ctx, next) => {
          expect(ctx.body).toBe("_");
          ctx.body += "root";
          await next();
        },
        async (args, ctx, next) => {
          expect(ctx.body).toBe("_root");
          ctx.body += "_";
          await next();
        },
      )
      root2(
        @Arg("username") username: string,
        @Arg("email") email: string,
        ctx: Context,
      ): User {
        expect(ctx.body).toBe("_root_");
        return new User(username);
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

    await client.query({
      query: gql`
        query {
          root(username: "root") {
            username
            mw
          }
        }
      `,
    });

    await client.query({
      query: gql`
        query {
          root2(username: "root", email: "root@root.com") {
            username
            mw
          }
        }
      `,
    });

    await server.stop();
  });
});
