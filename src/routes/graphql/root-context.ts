import { PrismaClient } from '@prisma/client';
import { createDataLoaders } from './create-data-loaders.js';

export type RootContext = {
  prisma: PrismaClient;
  loaders: ReturnType<typeof createDataLoaders>;
};
