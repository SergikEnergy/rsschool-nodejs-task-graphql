import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { User } from '@prisma/client';
import { UUIDType } from '../../../types/uuid.js';
import { userType } from '../user-type.js';

type Args = {
  id: User['id'];
};

export const getUserByIdQuery: GraphQLFieldConfig<unknown, RootContext, Args> = {
  type: userType,
  args: {
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'The id of the user',
    },
  },
  resolve: async (_obj, { id }, context) =>
    context.prisma.user.findUnique({ where: { id } }),
};
