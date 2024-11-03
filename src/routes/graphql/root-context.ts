import { PrismaClient } from '@prisma/client';

export type RootContext = {
  prismaDb: PrismaClient;
};
