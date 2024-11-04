import { MemberType, Post, PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

type ReadonlyIdsArray<T> = ReadonlyArray<T>;
type UserIdsArray = ReadonlyIdsArray<User['id']>;
type MemberTypeIdsArray = ReadonlyIdsArray<MemberType['id']>;

const createMapFromItem = <T, K extends keyof T>(items: T[], key: K) => {
  return new Map(items.map((item) => [item[key], item]));
};

export const createDataLoaders = (clientDb: PrismaClient) => ({
  usersLoader: new DataLoader(async (ids: ReadonlyArray<User['id']>) => {
    const users = await clientDb.user.findMany({
      where: {
        id: { in: [...ids] },
      },
      include: { subscribedToUser: true, userSubscribedTo: true },
    });

    const usersMap = createMapFromItem(users, 'id');

    return ids.map((id) => usersMap.get(id));
  }),
  getPostsByAuthorId: new DataLoader(async (ids: UserIdsArray) => {
    const posts = await clientDb.post.findMany({
      where: {
        authorId: { in: [...ids] },
      },
    });

    const postMap = posts.reduce((acc, curr) => {
      if (!acc.has(curr.authorId)) {
        acc.set(curr.authorId, []);
      }
      const currMapValue = acc.get(curr.authorId)!;
      currMapValue.push(curr);

      return acc;
    }, new Map<string, Post[]>());

    return ids.map((id) => postMap.get(id) || []);
  }),
  getProfilesByUserId: new DataLoader(async (ids: UserIdsArray) => {
    const profiles = await clientDb.profile.findMany({
      where: {
        userId: { in: [...ids] },
      },
    });

    const profilesMap = createMapFromItem(profiles, 'userId');

    return ids.map((id) => profilesMap.get(id));
  }),
  getMemberTypeById: new DataLoader(async (ids: MemberTypeIdsArray) => {
    const memberTypes = await clientDb.memberType.findMany({
      where: { id: { in: [...ids] } },
    });

    const memberTypesMap = createMapFromItem(memberTypes, 'id');

    return ids.map((id) => memberTypesMap.get(id));
  }),
  getUserSubscribedTo: new DataLoader(async (ids: UserIdsArray) => {
    const userSubscriptions = await clientDb.subscribersOnAuthors.findMany({
      where: {
        subscriberId: { in: [...ids] },
      },
      include: { author: true },
    });

    const userSubscriptionsMap = userSubscriptions.reduce((acc, curr) => {
      if (!acc.has(curr.subscriberId)) {
        acc.set(curr.subscriberId, []);
      }
      const currMapValue = acc.get(curr.subscriberId)!;
      currMapValue.push(curr.author);
      return acc;
    }, new Map<string, User[]>());

    return ids.map((id) => userSubscriptionsMap.get(id) || []);
  }),
  getSubscribedToUser: new DataLoader(async (ids: UserIdsArray) => {
    const followers = await clientDb.subscribersOnAuthors.findMany({
      where: {
        authorId: { in: [...ids] },
      },
      include: { subscriber: true },
    });

    const followersMap = followers.reduce((acc, curr) => {
      if (!acc.has(curr.authorId)) {
        acc.set(curr.authorId, []);
      }
      const currMapValue = acc.get(curr.authorId)!;
      currMapValue.push(curr.subscriber);
      return acc;
    }, new Map<string, User[]>());

    return ids.map((id) => followersMap.get(id) || []);
  }),
});
