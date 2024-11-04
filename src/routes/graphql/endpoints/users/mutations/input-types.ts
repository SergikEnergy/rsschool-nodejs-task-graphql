import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

export const createUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInputType',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  },
});

export const changeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInputType',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});
