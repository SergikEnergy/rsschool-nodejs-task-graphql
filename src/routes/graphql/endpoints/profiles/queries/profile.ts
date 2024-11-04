import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { Profile } from '@prisma/client';
import { UUIDType } from '../../../types/uuid.js';
import { profileType } from '../profiles-type.js';

type Args = {
  id: Profile['id'];
};

export const getProfileByIdQuery: GraphQLFieldConfig<unknown, RootContext, Args> = {
  type: profileType,
  args: {
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'The id of the profile',
    },
  },
  resolve: async (_obj, { id }, context) =>
    context.prisma.profile.findUnique({ where: { id } }),
};
