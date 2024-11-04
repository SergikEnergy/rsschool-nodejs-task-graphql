import { GraphQLList, GraphQLNonNull } from 'graphql';
import { profileType } from './profiles-type.js';

export const profilesListType = new GraphQLNonNull(
  new GraphQLList(new GraphQLNonNull(profileType)),
);
