const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');

const { queries, mutations } = require('./schemas');

const PORT = process.env.PORT || 3000;

const schema = new GraphQLSchema({
  query: queries.ProductQueryType,
  mutation: mutations.ProductMutationType,
});

const app = express();

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  context: { startTime: Date.now() },
}));

app.listen(PORT, () => console.log(`Running a GraphQL API server at localhost:${PORT}/graphql`));
