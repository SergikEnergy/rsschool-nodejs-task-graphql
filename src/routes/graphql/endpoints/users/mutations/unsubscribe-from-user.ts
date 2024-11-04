import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { UUIDType } from '../../../types/uuid.js';

type Args = {
  userId: string;
  authorId: string;
};

export const unsubscribeFromMutation: GraphQLFieldConfig<unknown, RootContext, Args> = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_obj, { authorId, userId }, context) => {
    await context.prisma.subscribersOnAuthors.delete({
      where: {
        subscriberId_authorId: {
          authorId,
          subscriberId: userId,
        },
      },
    });

    context.loaders.getSubscribedToUser.clear(authorId);
    context.loaders.getUserSubscribedTo.clear(userId);

    return `User with ID:${userId} was unsubscribed from author:${authorId}!`;
  },
};
