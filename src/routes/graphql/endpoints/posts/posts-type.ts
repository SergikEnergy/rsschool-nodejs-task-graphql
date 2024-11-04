import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { userType } from '../users/user-type.js';
import { RootContext } from '../../root-context.js';

export type PostType = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

export const postType = new GraphQLObjectType<PostType, RootContext>({
  name: 'Post',
  description: 'describe available post type fields',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'Unique post id, should be in uuid format',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'describe post title, should be string',
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'describe post content, should be string',
    },
    authorId: {
      type: new GraphQLNonNull(UUIDType),
      description: "Unique author's post id, should be in uuid format",
    },
    author: {
      type: new GraphQLNonNull(userType),
      description: 'info about author of this post, should have User type',
      resolve: async (post, _args, context) =>
        await context.prisma.user.findUnique({
          where: {
            id: post.authorId,
          },
        }),
    },
  }),
});
