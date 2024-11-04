import { GraphQLList, GraphQLNonNull } from 'graphql';
import { memberType } from './member-type.js';

export const membersListType = new GraphQLNonNull(
  new GraphQLList(new GraphQLNonNull(memberType)),
);
