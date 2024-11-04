import { GraphQLFieldConfig, GraphQLNonNull, GraphQLString } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { UUIDType } from '../../../types/uuid.js';

type Args = { id: string };

export const deleteProfileMutation: GraphQLFieldConfig<unknown, RootContext, Args> = {
  type: new GraphQLNonNull(GraphQLString),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_obj, { id }, context) => {
    await context.prisma.profile.delete({ where: { id } });
    context.loaders.getProfilesByUserId.clear(id);

    return `Profile with ID:${id} was deleted!`;
  },
};
