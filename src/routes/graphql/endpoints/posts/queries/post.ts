import { GraphQLFieldConfig, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { Post } from '@prisma/client';
import { UUIDType } from '../../../types/uuid.js';
import { postType } from '../posts-type.js';

type Args = {
  id: Post['id'];
};

export const getPostByIdQuery: GraphQLFieldConfig<unknown, RootContext, Args> = {
  type: postType as GraphQLObjectType,
  args: {
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'Unique post id',
    },
  },
  resolve: async (_obj, { id }, context) =>
    context.prisma.post.findUnique({ where: { id } }),
};
