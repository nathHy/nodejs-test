const { GraphQLObjectType, GraphQLList, GraphQLInt } = require('graphql');

const { ProductType } = require('../types/GraphQLProductObjectSample');
const Product = require('../../models/product.js');

const ProductQueryType = new GraphQLObjectType({
  name: 'ProductQueryType',
  fields: {
    product: {
      type: ProductType,
      description: 'Query for a single product',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, { id }) => Product.fetch({ id }),
    },
    products: {
      type: new GraphQLList(ProductType),
      description: 'Query for all products',
      resolve: () => Product.fetchAll(),
    },
  },
});

module.exports = { ProductQueryType };
