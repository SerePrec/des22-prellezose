import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import ApiTestsController from "../controllers/apiTestsController.js";
import ApiRandomsController from "../controllers/apiRandomsController.js";
import config from "../config.js";

class ApiRouter {
  constructor() {
    this.apiTestsController = new ApiTestsController();
    this.randomsController = new ApiRandomsController();
  }

  start() {
    // GraphQL schema
    const schema = buildSchema(`
      type Query {
        randoms(cant: Int): [RandomPair!]!
        productsMock: [Product!]!
      }
      type Product {
        id: ID!
        title: String!
        price: Float!
        thumbnail: String!
        timestamp: String!
      }
      type RandomPair {
        number: String!
        occurrency: Int!
      }
    `);

    // Root resolver
    const root = {
      productsMock: this.apiTestsController.getProductosTest,
      randoms: this.randomsController.getRandoms
    };

    return graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: config.GRAPHIQL
    });
  }
}

export default new ApiRouter();
