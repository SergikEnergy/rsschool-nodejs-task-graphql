import { GraphQLFieldConfig, GraphQLResolveInfo } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { usersListType } from '../users-list-type.js';
import {
  parse,
  ResolveTree,
  simplifyParsedResolveInfoFragmentWithType,
} from 'graphql-parse-resolve-info';

export const getUsersQuery: GraphQLFieldConfig<unknown, RootContext> = {
  type: usersListType,
  resolve: async (_obj, _args, context, info: GraphQLResolveInfo) => {
    const parsedResolveInfoFragment = parse(info);

    const { fields } = simplifyParsedResolveInfoFragmentWithType(
      parsedResolveInfoFragment as ResolveTree,
      usersListType,
    );

    if (!fields) return await context.prisma.user.findMany();

    const usersInfo = await context.prisma.user.findMany({
      include: {
        userSubscribedTo: Boolean(fields['userSubscribedTo']),
        subscribedToUser: Boolean(fields['subscribedToUser']),
        profile: Boolean(fields['profile']),
        posts: Boolean(fields['posts']),
      },
    });

    usersInfo.forEach((info) => context.loaders.usersLoader.prime(info.id, info));

    return usersInfo;
  },
};
