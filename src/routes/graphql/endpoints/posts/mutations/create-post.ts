import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { Post } from '@prisma/client';
import { postType } from '../posts-type.js';
import { createPostInputType } from './input-types.js';

type Args = {
  dto: Omit<Post, 'id'>;
};

export const createPostMutation: GraphQLFieldConfig<unknown, RootContext, Args> = {
  type: new GraphQLNonNull(postType),
  args: {
    dto: {
      type: new GraphQLNonNull(createPostInputType),
    },
  },
  resolve: (_obj, { dto }, context) => {
    return context.prisma.post.create({ data: dto });
  },
};
