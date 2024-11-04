import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, graphQLSchema } from './schemas.js';
import { graphql } from 'graphql';
import { createDataLoaders } from './create-data-loaders.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler({ body: { query, variables } }) {
      return await graphql({
        schema: graphQLSchema,
        source: query,
        contextValue: { prisma, ...createDataLoaders },
        variableValues: variables,
      });
    },
  });
};

export default plugin;
