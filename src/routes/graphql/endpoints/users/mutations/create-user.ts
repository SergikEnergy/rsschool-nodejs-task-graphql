import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { userType } from '../user-type.js';
import { User } from '@prisma/client';
import { createUserInputType } from './input-types.js';

type Args = { dto: Omit<User, 'id'> };

export const createUserMutation: GraphQLFieldConfig<unknown, RootContext, Args> = {
  type: new GraphQLNonNull(userType),
  args: {
    dto: {
      type: new GraphQLNonNull(createUserInputType),
    },
  },
  resolve: async (_obj, { dto }, context) => {
    return context.prisma.user.create({ data: dto });
  },
};
