import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { memberTypeId } from '../members/type-member.js';

export const profileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'describe available profiles type fields',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'Unique profile id, should be in uuid format',
    },
    isMale: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: "describe is the men's profile or not, should be boolean",
    },
    yearOfBirth: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "describe the profile owner's birth date, should be integer",
    },
    memberType: {
      type: new GraphQLNonNull(memberTypeId),
      description: "describe member's type: BASIC | BUSINESS",
    },
  }),
});

export const profilesListType = new GraphQLNonNull(
  new GraphQLList(new GraphQLNonNull(profileType)),
);
