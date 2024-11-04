import { GraphQLFieldConfig } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { usersListType } from '../users-list-type.js';

export const getUsersQuery: GraphQLFieldConfig<unknown, RootContext> = {
  type: usersListType,
  resolve: async (_obj, _args, context) => context.prisma.user.findMany(),
};
