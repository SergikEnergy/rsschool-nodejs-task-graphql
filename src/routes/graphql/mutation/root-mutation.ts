import { GraphQLObjectType } from 'graphql';
import { RootContext } from '../root-context.js';
import { createUserMutation } from '../endpoints/users/mutations/create-user.js';
import { createProfileMutation } from '../endpoints/profiles/mutations/create-profile.js';
import { createPostMutation } from '../endpoints/posts/mutations/create-post.js';

export const rootMutationType = new GraphQLObjectType<unknown, RootContext>({
  name: 'RootQuery',
  fields: () => ({
    createUser: createUserMutation,
    createProfile: createProfileMutation,
    createPost: createPostMutation,
  }),
});
