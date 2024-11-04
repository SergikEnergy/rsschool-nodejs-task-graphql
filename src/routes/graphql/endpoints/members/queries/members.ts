import { GraphQLFieldConfig } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { membersListType } from '../members-list-type.js';

export const getMembersQuery: GraphQLFieldConfig<unknown, RootContext> = {
  type: membersListType,
  resolve: async (_obj, _args, context) => context.prisma.memberType.findMany(),
};
