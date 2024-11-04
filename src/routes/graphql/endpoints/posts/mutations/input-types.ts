import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import { UUIDType } from '../../../types/uuid.js';

export const createPostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInputType',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
});

export const changePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInputType',
  fields: {
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  },
});
