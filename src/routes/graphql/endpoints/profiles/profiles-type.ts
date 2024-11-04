import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../../types/uuid.js';
import { memberType, memberTypeId } from '../members/member-type.js';
import { RootContext } from '../../root-context.js';

export type ProfileFieldsType = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  memberTypeID: string;
  userId: string;
};

export const profileType = new GraphQLObjectType<ProfileFieldsType, RootContext>({
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
    userId: {
      type: new GraphQLNonNull(UUIDType),
      description: "Unique profile's owner, should be in uuid format",
    },
    memberTypeId: {
      type: new GraphQLNonNull(memberTypeId),
      description: "describe member's type: BASIC | BUSINESS",
    },
    memberType: {
      type: memberType,
      description: 'contains member types according to the member type ud',
      resolve: async (profile, _args, context) =>
        await context.loaders.memberTypeDataLoader.load(profile.memberTypeID),
    },
  }),
});
