import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { memberTypeId, memberType } from '../member-type.js';
import { MemberType } from '@prisma/client';

type Args = {
  id: MemberType['id'];
};

export const getMemberByIdQuery: GraphQLFieldConfig<unknown, RootContext, Args> = {
  type: new GraphQLNonNull(memberType),
  args: {
    id: {
      type: new GraphQLNonNull(memberTypeId),
      description: 'The id of the member BASIC or BUSINESS.',
    },
  },
  resolve: async (_obj, { id }, context) =>
    context.prisma.memberType.findUnique({ where: { id } }),
};
