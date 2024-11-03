import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { UUIDType } from '../../types/uuid.js';

export const userType = new GraphQLObjectType({
  name: 'User',
  description: 'describe available user type fields',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'Unique user id, should be in uuid format',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'user name id, should be in string',
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'user current balance, should be a float number',
    },
  }),
});

export const usersListType = new GraphQLNonNull(
  new GraphQLList(new GraphQLNonNull(userType)),
);
