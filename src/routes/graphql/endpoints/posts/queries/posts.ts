import { GraphQLFieldConfig } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { postsListType } from '../posts-list-type.js';
import { Post } from '@prisma/client';

type Args = {
  authorId: Post['authorId'];
};

export const getPostsQuery: GraphQLFieldConfig<unknown, RootContext, Args> = {
  type: postsListType,
  resolve: async (_obj, { authorId }, context) =>
    context.prisma.post.findMany({ where: { authorId } }),
};
