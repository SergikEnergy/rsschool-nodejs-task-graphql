import { GraphQLFieldConfig } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { usersListType } from '../user-type.js';

export const getUsersQuery: GraphQLFieldConfig<unknown, RootContext> = {
  type: usersListType,
  resolve: async (_obj, _args, context) => context.prismaDb.user.findMany(),
};
