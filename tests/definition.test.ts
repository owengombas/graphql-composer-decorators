import {
  Schema,
  ObjectType,
  InputType,
  Field,
  Resolver,
  Query,
  Arg,
  Args,
  Nullable,
  InterfaceType,
  Description,
  Meta,
  Middlewares,
} from "../src/";
import { Request, Selection, Middleware } from "graphql-composer";
import { ApolloServer, gql } from "apollo-server";
import ApolloClient from "apollo-boost";
import fetch from "node-fetch";

@ObjectType()
@InputType("AInput")
@InterfaceType("AInterface")
@Description("Test")
@Middlewares(function a() {
  console.log("A");
})
class A {
  @Field(() => Nullable(String))
  @Description("hello")
  @Middlewares(function b() {
    console.log("B");
  })
  test: string;
}

@ObjectType()
@InputType("BInput")
class B extends A {
  @Field()
  test2: string;
}

@Resolver()
class R {
  @Query()
  @Meta({ test: "hello" })
  query(
    @Arg("test")
    test: string,
    @Args()
    test3: A,
    @Arg("test2")
    test2: string,
    a,
    b,
    c,
    d,
  ): A {
    return undefined;
  }
}

const request = Request.create<any>("query", "query", {
  test: "yo",
  test2: "b",
}).select(Selection.create("test"));

const client = new ApolloClient({
  uri: "http://localhost:4002/graphql",
  fetch,
});

beforeAll(async () => {
  const schema = Schema.create()
    .setConfig({ notNullableByDefault: true })
    .load();
  const built = schema.build();

  const server = new ApolloServer({
    schema: built,
  });
  await server.listen(4002);
});

describe("Queries", () => {
  it("Should create a resolver some arguments", async () => {
    const res = await client.query({
      query: gql`
        ${request.source}
      `,
    });
  });
});
