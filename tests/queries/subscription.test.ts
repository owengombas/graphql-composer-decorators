import {
  ObjectType,
  Field,
  Resolver,
  Query,
  Arg,
  Schema,
  Subscription,
  Middlewares,
  Middleware,
} from "../../src";
import { ApolloServer, gql } from "apollo-server-express";
import ApolloClient from "apollo-client";
import fetch from "node-fetch";
import { PubSub } from "graphql-subscriptions";
import { createServer } from "http";
import { WebSocketLink } from "apollo-link-ws";
import * as express from "express";
import * as ws from "ws";
import { getMainDefinition } from "apollo-utilities";
import { HttpLink } from "apollo-link-http";
import { split, ApolloLink } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Context } from "graphql-composer";

const app = express();

const httpLink = new HttpLink({
  fetch,
  uri: "http://localhost:4003/graphql",
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:4003/graphql`,
  webSocketImpl: ws,
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as any;
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink,
);

const link = ApolloLink.from([terminatingLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

const pubsub = new PubSub();

@ObjectType()
class Response {
  @Field()
  res: string = "res";

  constructor(res?: string) {
    if (res) {
      this.res = res;
    }
  }
}

class MW extends Middleware {
  binded = "binded";

  async resolve(args, ctx, next) {
    expect(args.notif).toBe("notif");
    expect(ctx.source).toEqual({ payload: "mypayload" });
    args.notif = "NOTIFICATION";
    await next();
  }
}

@Resolver()
class R {
  binded = "binded";

  @Query()
  trigger(@Arg("notif") notif: string): Response {
    expect(notif).toBe("NOTIFICATION");
    pubsub.publish(notif, { payload: "mypayload" });
    return new Response();
  }

  @Subscription({
    subscription: (args) => {
      expect(args.notif).toBe("notif");
      return pubsub.asyncIterator("NOTIFICATION");
    },
  })
  @Middlewares(MW)
  notification(@Arg("notif") notif: string, ctx: Context): Response {
    expect(notif).toBe("NOTIFICATION");
    return new Response(ctx.source.payload);
  }
}

const schema = Schema.create()
  .setConfig({ requiredByDefault: true })
  .load()
  .build();

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

afterAll(async () => {
  await client.stop();
  await server.stop();
  await new Promise((resolve) => {
    httpServer.close(() => {
      resolve();
    });
  });
});

describe("Subscription", () => {
  it("Should create a subscription", async (done) => {
    // eslint-disable-next-line prefer-const
    let loop: any;

    await new Promise((resolve) => {
      httpServer.listen({ port: 4003 }, () => {
        resolve();
      });
    });

    const res = await client.subscribe({
      query: gql`
        subscription {
          notification(notif: "notif") {
            res
          }
        }
      `,
    });

    res.subscribe(async (value) => {
      expect(value).toEqual({
        data: {
          notification: { __typename: "Response", res: "mypayload" },
        },
      });
      clearInterval(loop);
      done();
    });

    loop = setInterval(async () => {
      await client.query({
        query: gql`
          query {
            trigger(notif: "NOTIFICATION") {
              res
            }
          }
        `,
      });
    }, 100);
  }, 9999999);
});
