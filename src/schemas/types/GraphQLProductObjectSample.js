const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLFloat, GraphQLInputObjectType } = require('graphql');

const PRODUCT_FIELDS = {
  id: { type: GraphQLInt },
  price: { type: GraphQLFloat },
  name: { type: GraphQLString },
  description: { type: GraphQLString },
  imageUrl: { type: GraphQLString },
};

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: PRODUCT_FIELDS,
});

const ProductAddType = new GraphQLInputObjectType({
  name: 'ProductAddType',
  type: ProductType,
  fields: {
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    imageUrl: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const ProductUpdateType = new GraphQLInputObjectType({
  name: 'ProductUpdateType',
  type: ProductType,
  fields: {
    ...PRODUCT_FIELDS,
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const ProductDeleteType = new GraphQLInputObjectType({
  name: 'ProductDeleteType',
  type: ProductType,
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

module.exports = { ProductType, ProductAddType, ProductUpdateType, ProductDeleteType };
