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
  resolve: async (_obj, { dto }, context) => {
    const newPost = await context.prisma.post.create({ data: dto });
    context.loaders.getPostsByAuthorId.clear(dto.authorId);

    return newPost;
  },
};
