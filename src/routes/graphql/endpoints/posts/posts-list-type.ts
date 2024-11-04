import { GraphQLList, GraphQLNonNull } from 'graphql';
import { postType } from './posts-type.js';

export const postsListType = new GraphQLNonNull(
  new GraphQLList(new GraphQLNonNull(postType)),
);
