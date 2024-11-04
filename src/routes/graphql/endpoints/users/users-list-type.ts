import { GraphQLList, GraphQLNonNull } from 'graphql';
import { userType } from './user-type.js';

export const usersListType = new GraphQLNonNull(
  new GraphQLList(new GraphQLNonNull(userType)),
);
