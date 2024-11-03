import { GraphQLFieldConfig } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { membersListType } from '../../type-member.js';

export const getMembersQuery: GraphQLFieldConfig<unknown, RootContext> = {
  type: membersListType,
  resolve: async (_obj, _args, context) => context.prismaDb.memberType.findMany(),
};
