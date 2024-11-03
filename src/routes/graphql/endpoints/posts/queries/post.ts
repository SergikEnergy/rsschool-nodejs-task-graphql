import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { Post } from '@prisma/client';
import { UUIDType } from '../../../types/uuid.js';
import { postType } from '../posts-type.js';

type Args = {
  id: Post['id'];
};

export const getPostByIdQuery: GraphQLFieldConfig<unknown, RootContext, Args> = {
  type: postType,
  args: {
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'The id of the post',
    },
  },
  resolve: async (_obj, { id }, context) =>
    context.prismaDb.post.findUnique({ where: { id } }),
};
