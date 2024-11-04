import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { userType } from '../user-type.js';
import { User } from '@prisma/client';
import { UUIDType } from '../../../types/uuid.js';
import { changeUserInputType } from './input-types.js';

type Args = { id: string; dto: Pick<User, 'name' | 'balance'> };

export const changeUserMutation: GraphQLFieldConfig<unknown, RootContext, Args> = {
  type: new GraphQLNonNull(userType),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(changeUserInputType) },
  },
  resolve: (_obj, { id, dto }, context) => {
    return context.prisma.user.update({ where: { id }, data: dto });
  },
};
