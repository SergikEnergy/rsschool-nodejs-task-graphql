import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { UUIDType } from '../../../types/uuid.js';

type Args = {
  userId: string;
  authorId: string;
};

export const subscribeToMutation: GraphQLFieldConfig<unknown, RootContext, Args> = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_obj, { authorId, userId }, context) => {
    await context.prisma.subscribersOnAuthors.create({
      data: {
        subscriberId: userId,
        authorId: authorId,
      },
    });

    context.loaders.getSubscribedToUser.clear(userId);
    context.loaders.getUserSubscribedTo.clear(authorId);

    return `User with ID:${authorId} was subscribed to author:${userId}!`;
  },
};
