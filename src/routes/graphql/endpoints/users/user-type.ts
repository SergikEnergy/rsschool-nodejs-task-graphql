import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { UUIDType } from '../../types/uuid.js';
import { profileType } from '../profiles/profiles-type.js';
import { RootContext } from '../../root-context.js';
import { postType } from '../posts/posts-type.js';
import { Post, Profile, User } from '@prisma/client';

export type UserFieldsType = User & {
  profile?: Profile;
  posts?: Post[];
  userSubscribedTo?: SubscriptionInfo[];
  subscribedToUser?: SubscriptionInfo[];
};

type SubscriptionInfo = {
  subscriberId: string;
  authorId: string;
};

export const userType: GraphQLObjectType = new GraphQLObjectType<
  UserFieldsType,
  RootContext
>({
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
      type: profileType as GraphQLObjectType,
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
      resolve: async (user, _args, context) => {
        if (!user.userSubscribedTo || !user.userSubscribedTo.length) return;

        const subscriptionIds = user.userSubscribedTo.map((elem) => elem.authorId);

        return await context.loaders.usersLoader.loadMany(subscriptionIds);
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(userType))),
      description:
        "provide an information about user's, who is subscribed to current user",
      resolve: async (user, _args, context) => {
        if (!user.subscribedToUser || !user.subscribedToUser.length) return;

        const followerIds = user.subscribedToUser.map((elem) => elem.subscriberId);
        return await context.loaders.usersLoader.loadMany(followerIds);
      },
    },
  }),
});