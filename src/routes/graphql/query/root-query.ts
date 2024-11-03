import { GraphQLObjectType } from 'graphql';
import { RootContext } from '../root-context.js';
import { getMembersQuery } from '../endpoints/members/queries/members.js';
import { getMemberByIdQuery } from '../endpoints/members/queries/member.js';
import { getPostsQuery } from '../endpoints/posts/queries/posts.js';
import { getPostByIdQuery } from '../endpoints/posts/queries/post.js';
import { getProfileByIdQuery } from '../endpoints/profiles/queries/profile.js';
import { getProfilesQuery } from '../endpoints/profiles/queries/profiles.js';

export const rootQueryType = new GraphQLObjectType<unknown, RootContext>({
  name: 'RootQuery',
  fields: () => ({
    memberTypes: getMembersQuery,
    memberType: getMemberByIdQuery,

    posts: getPostsQuery,
    post: getPostByIdQuery,

    profiles: getProfilesQuery,
    profile: getProfileByIdQuery,
  }),
});
