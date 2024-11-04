import { GraphQLObjectType } from 'graphql';
import { RootContext } from '../root-context.js';
import { createUserMutation } from '../endpoints/users/mutations/create-user.js';
import { createProfileMutation } from '../endpoints/profiles/mutations/create-profile.js';
import { createPostMutation } from '../endpoints/posts/mutations/create-post.js';
import { changePostMutation } from '../endpoints/posts/mutations/change-post.js';
import { changeProfileMutation } from '../endpoints/profiles/mutations/change-profile.js';
import { changeUserMutation } from '../endpoints/users/mutations/change-user.js';
import { deleteUserMutation } from '../endpoints/users/mutations/delete-user.js';
import { deletePostMutation } from '../endpoints/posts/mutations/delete-post.js';
import { deleteProfileMutation } from '../endpoints/profiles/mutations/delete-profile.js';

export const rootMutationType = new GraphQLObjectType<unknown, RootContext>({
  name: 'RootQuery',
  fields: () => ({
    createUser: createUserMutation,
    createProfile: createProfileMutation,
    createPost: createPostMutation,

    changePost: changePostMutation,
    changeProfile: changeProfileMutation,
    changeUser: changeUserMutation,

    deleteUser: deleteUserMutation,
    deletePost: deletePostMutation,
    deleteProfile: deleteProfileMutation,
  }),
});
