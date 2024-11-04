import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { profileType } from '../profiles-type.js';
import { UUIDType } from '../../../types/uuid.js';
import { changeProfileInputType } from './input-types.js';
import { Profile } from '@prisma/client';

type Args = {
  id: string;
  dto: Omit<Profile, 'id'>;
};

export const changeProfileMutation: GraphQLFieldConfig<unknown, RootContext, Args> = {
  type: new GraphQLNonNull(profileType),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(changeProfileInputType) },
  },
  resolve: (_obj, { id, dto }, context) => {
    return context.prisma.profile.update({ where: { id }, data: dto });
  },
};
