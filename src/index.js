const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');

const db = require('./db.js');
const { queries, mutations } = require('./schemas');

const PORT = process.env.PORT || 3000;
const schema = new GraphQLSchema({
  query: queries.ProductQueryType,
  mutation: mutations.ProductMutationType,
});

const app = express();

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, () => console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`));
