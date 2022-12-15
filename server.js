import express from 'express';
import { graphqlHTTP } from 'express-graphql';

import schema from "./src/schema.js";
import resolvers from "./src/resolvers.js";

let app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');