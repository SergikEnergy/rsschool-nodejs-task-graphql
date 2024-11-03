import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { memberTypeId, memberType } from '../type-member.js';
import { MemberType } from '@prisma/client';

type Args = {
  id: MemberType['id'];
};

export const getMemberByIdQuery: GraphQLFieldConfig<unknown, RootContext, Args> = {
  type: memberType,
  args: {
    id: {
      type: new GraphQLNonNull(memberTypeId),

      description: 'The id of the member BASIC or BUSINESS.',
    },
  },
  resolve: async (_obj, { id }, context) =>
    context.prismaDb.memberType.findUnique({ where: { id } }),
};
