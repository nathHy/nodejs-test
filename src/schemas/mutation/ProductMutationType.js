const { GraphQLObjectType, GraphQLNonNull } = require('graphql');

const { ProductType, ProductAddType, ProductUpdateType, ProductDeleteType } = require('../types/GraphQLProductObjectSample');
const Product = require('../../models/product.js');

const ProductMutationType = new GraphQLObjectType({
  name: 'ProductMutationType',
  fields: {
    addProduct: {
      type: ProductType,
      args: {
        input: { type: new GraphQLNonNull(ProductAddType) },
      },
      resolve: (_, { input }) => Product.create(input),
    },
    deleteProduct: {
      type: ProductType,
      args: {
        input: { type: new GraphQLNonNull(ProductDeleteType) },
      },
      resolve: (_, { input }) => Product.delete({ id: input.id }),
    },
    updateProduct: {
      type: ProductType,
      args: {
        input: { type: new GraphQLNonNull(ProductUpdateType) },
      },
      resolve: (_, { input }) => Product.update(input),
    },
  },
});

module.exports = { ProductMutationType };
