import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { Profile } from '@prisma/client';
import { profileType } from '../profiles-type.js';
import { createProfileInputType } from './input-types.js';

type Args = {
  dto: Omit<Profile, 'id'>;
};

export const createProfileMutation: GraphQLFieldConfig<unknown, RootContext, Args> = {
  type: new GraphQLNonNull(profileType),
  args: { dto: { type: new GraphQLNonNull(createProfileInputType) } },
  resolve: (_obj, { dto }, context) => {
    return context.prisma.profile.create({ data: dto });
  },
};
