import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { UUIDType } from '../../types/uuid.js';
import { profileType } from '../profiles/profiles-type.js';
import { User } from '@prisma/client';
import { RootContext } from '../../root-context.js';
import { postType } from '../posts/posts-type.js';

export const userType = new GraphQLObjectType<User, RootContext>({
  name: 'User',
  description: 'describe available user type fields',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'Unique user id, should be in uuid format',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'user name id, should be in string',
    },
    balance: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'user current balance, should be a float number',
    },
    profile: {
      type: profileType,
      description:
        'provide information about current user profile, should have Profile type',
      resolve: async (user, _args, context) =>
        context.loaders.getProfilesByUserId.load(user.id),
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(postType))),
      description: "provide an information about user's posts",
      resolve: async (user, _args, context) =>
        context.loaders.getPostsByAuthorId.load(user.id),
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(userType))),
      description: "provide an information about user's, who is current subscribed to",
      resolve: async (user, _args, context) =>
        context.loaders.getUserSubscribedTo.load(user.id),
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(userType))),
      description:
        "provide an information about user's, who is subscribed to current user",
      resolve: async (user, _args, context) =>
        context.loaders.getSubscribedToUser.load(user.id),
    },
  }),
});
