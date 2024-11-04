import { GraphQLFieldConfig } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { profilesListType } from '../profiles-list-type.js';

export const getProfilesQuery: GraphQLFieldConfig<unknown, RootContext> = {
  type: profilesListType,
  resolve: async (_obj, _args, context) => context.prisma.profile.findMany(),
};
