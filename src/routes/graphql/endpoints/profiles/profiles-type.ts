import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { memberType } from '../members/member-type.js';
import { RootContext } from '../../root-context.js';
import { Profile } from '@prisma/client';

export const profileType = new GraphQLObjectType<Profile, RootContext>({
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
      type: new GraphQLNonNull(memberType),
      description: 'contains member types according to the member type ud',
      resolve: async (profile, _args, context) =>
        context.loaders.getMemberTypeById.load(profile.memberTypeId),
    },
  }),
});
