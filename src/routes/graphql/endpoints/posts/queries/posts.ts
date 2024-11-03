import { GraphQLFieldConfig } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { postsListType } from '../posts-type.js';

export const getPostsQuery: GraphQLFieldConfig<unknown, RootContext> = {
  type: postsListType,
  resolve: async (_obj, _args, context) => context.prismaDb.post.findMany(),
};
