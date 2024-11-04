import { MemberType, PrismaClient, User } from '@prisma/client';
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

    const postsMap = createMapFromItem(posts, 'authorId');

    return ids.map((id) => postsMap.get(id) || []);
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
  memberTypeDataLoader: new DataLoader(async (ids: MemberTypeIdsArray) => {
    const memberTypes = await clientDb.memberType.findMany({
      where: { id: { in: [...ids] } },
    });

    return ids.map((id) => memberTypes.find((memberType) => memberType.id === id));
  }),
});
