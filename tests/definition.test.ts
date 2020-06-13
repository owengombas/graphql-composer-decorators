// import {
//   Schema,
//   ObjectType,
//   InputType,
//   Field,
//   Resolver,
//   Query,
//   Arg,
//   Args,
//   Description,
//   Meta,
//   Middlewares,
// } from "../src/";
// import { Context } from "graphql-composer";
// import { ApolloServer, gql } from "apollo-server";
// import ApolloClient from "apollo-boost";
// import fetch from "node-fetch";

// @ObjectType()
// @InputType("AInput")
// @Description("Test")
// @Middlewares(async function a(a, b, c) {
//   console.log("A");
//   await c();
// })
// class A {
//   @Field()
//   @Middlewares(async function b(a, b, c) {
//     console.log("B");
//     await c();
//   })
//   test(
//     @Arg("testArg")
//     testArg: string,
//     @Args()
//     test3: A,
//     @Arg("test2")
//     test2: string,
//     ctx: Context,
//     b,
//   ): string {
//     return "hello";
//   }
// }

// @ObjectType()
// @InputType("BInput")
// class B extends A {
//   @Field()
//   test2: string;
// }

// @Resolver()
// @Middlewares(async function c(a, b, c) {
//   console.log("C");
//   await c();
// })
// class R {
//   binded = "binded";

//   @Query(() => A)
//   @Meta({ test: "hello" })
//   @Middlewares(async function d(a, b, c) {
//     console.log("D");
//     await c();
//   })
//   query(
//     @Arg("testArg")
//     testArg: string,
//     @Args()
//     test3: A,
//     @Arg("test2")
//     test2: string,
//     ctx: Context,
//     b,
//   ): A {
//     return new A();
//   }
// }

// const client = new ApolloClient({
//   uri: "http://localhost:4002/graphql",
//   fetch,
// });

// beforeAll(async () => {
//   // const schema = Schema.create().setConfig({ requiredByDefault: true }).load();
//   // const built = schema.build();
//   // const server = new ApolloServer({
//   //   schema: built,
//   // });
//   // await server.listen(4002);
// });

// describe("Queries", () => {
//   it("Should create a resolver some arguments", async () => {
//     // const res = await client.query({
//     //   query: gql`
//     //     query {
//     //       query(testArg: "test", test: "test", test2: "test") {
//     //         test(testArg: "test", test: "test", test2: "test")
//     //       }
//     //     }
//     //   `,
//     // });
//     // console.log(res);
//   });
// });

describe("Definition", () => {
  it("_", () => {});
});
