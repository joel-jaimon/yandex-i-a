import { RESOLVERS } from "./src/graphql/resolvers";

require("dotenv/config");
require("reflect-metadata");
const cookieParser = require("cookie-parser");
// const { RESOLVERS } = require("./src/graphql/resolvers");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { buildSchema } = require("type-graphql");
const { createConnection } = require("typeorm");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonBodyParser = bodyParser.json();

const app = express();

app.use(jsonBodyParser);
app.use(cookieParser());

(async () => {
  await createConnection();
  //add cors middleware
  app.use(
    cors({
      origin: ["http://localhost:3000"],
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: RESOLVERS,
      //timestamp based ("timestamp") - 1518037458374
      // ISO format ("isoDate") - "2018-02-07T21:04:39.573Z"
      dateScalarMode: "isoDate",
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  const PORT = 4000;

  app.listen(PORT, () => {
    console.log(`🚀  Server ready at ${PORT}`);
  });
})();
