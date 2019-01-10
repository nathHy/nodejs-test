# Developer Test

> A simple test to show us how awesome you are!

Your task is to build a Nodejs + GraphQL powered service to:

- Create a GraphQL powered api with MySql as the datasource
- The GraphQL should provide required Queries, Mutations for CRUD operations on the Product object (See Schema: [GraphQL Object](https://github.com/whitechdevs/nodejs-test/blob/master/GraphQLProductObjectSample.js "GraphQL Object"))
- The entire stack needs to be dockerised (Application container and Database container). 

## Requirements

- Framework of your choice (E.g, ExpressJS)
- ES6 +
- GraphQL with MySql
- Good code quality
- 100% Test coverage
- Ideally surprise us!

## Notes

- Feel free to use npm packages to help you achieve a result.
- Use Docker Hub to host your docker files.

## Deliverable

Send us your repository URL. Your code will be reviewed and we'll ask you questions in the issue tracker.

When we pull your code we'll execute the following commands:

```
yarn
yarn docker-test # Runs unit tests inside a Docker container
docker-compose up
```

## Product Schema Sample

Sample GraphQL Product Schema:  [GraphQL Object](https://github.com/whitechdevs/nodejs-test/blob/master/GraphQLProductObjectSample.js "GraphQL Object")
