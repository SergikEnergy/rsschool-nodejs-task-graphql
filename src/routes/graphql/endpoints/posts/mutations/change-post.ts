import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { RootContext } from '../../../root-context.js';
import { Post } from '@prisma/client';
import { postType } from '../posts-type.js';
import { UUIDType } from '../../../types/uuid.js';
import { changePostInputType } from './input-types.js';

type Args = {
  id: string;
  dto: Omit<Post, 'id'>;
};

export const changePostMutation: GraphQLFieldConfig<unknown, RootContext, Args> = {
  type: new GraphQLNonNull(postType),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
    dto: { type: new GraphQLNonNull(changePostInputType) },
  },
  resolve: (_obj, { id, dto }, context) => {
    return context.prisma.post.update({ where: { id }, data: dto });
  },
};
