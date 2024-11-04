import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { RootContext } from '../../root-context.js';
import { MemberType } from '@prisma/client';

export const memberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  description:
    'one of two possible member types - BUSINESS or BASIC according to the prisma db',
  values: {
    BASIC: { value: 'BASIC' },
    BUSINESS: { value: 'BUSINESS' },
  },
});

export const memberType = new GraphQLObjectType<MemberType, RootContext>({
  name: 'MemberType',
  description: 'possible fields for getting members',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(memberTypeId),
      description: 'Identifiers the type of member.',
    },
    discount: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'possible percent of a discount for the member',
    },
    postsLimitPerMonth: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'max numbers of posts that ca be created per month with defined user',
    },
  }),
});
