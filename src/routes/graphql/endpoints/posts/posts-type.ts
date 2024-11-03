import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../../types/uuid.js';

export const postType = new GraphQLObjectType({
  name: 'Post',
  description: 'describe available post type fields',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(UUIDType),
      description: 'Unique post id, should be in uuid format',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'describe post title, should be string',
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'describe post content, should be string',
    },
    //TODO check if need this field - or provide full authors info instead
    // authorId: {
    //   type: new GraphQLNonNull(UUIDType),
    //   description: 'Unique id for the author of the post, should be in uuid format',
    // },
  }),
});

export const postsListType = new GraphQLNonNull(
  new GraphQLList(new GraphQLNonNull(postType)),
);
