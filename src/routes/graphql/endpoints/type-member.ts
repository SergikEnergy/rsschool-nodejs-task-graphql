import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';

export const membersTypeEnum = new GraphQLEnumType({
  name: 'MemberType',
  description:
    'one of two possible member types - BUSINESS or BASIC according to the prisma db',
  values: {
    BASIC: {
      value: 'BASIC',
    },
    BUSINESS: {
      value: 'BUSINESS',
    },
  },
});

export const memberType = new GraphQLObjectType({
  name: 'GetMemberType',
  description: 'posibble fields for getting members',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(membersTypeEnum),
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

export const membersListType = new GraphQLNonNull(
  new GraphQLList(new GraphQLNonNull(memberType)),
);
