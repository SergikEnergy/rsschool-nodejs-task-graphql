import { GraphQLObjectType } from 'graphql';
import { RootContext } from '../root-context.js';
import { getMembersQuery } from '../endpoints/members/queries/member-types.js';
import { getMemberByIdQuery } from '../endpoints/members/queries/member-type.js';

export const rootQueryType = new GraphQLObjectType<unknown, RootContext>({
  name: 'RootQuery',
  fields: () => ({
    memberTypes: getMembersQuery,
    memberType: getMemberByIdQuery,
  }),
});
