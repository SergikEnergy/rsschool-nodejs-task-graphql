import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, graphQLSchema } from './schemas.js';
import { graphql, GraphQLError, parse, validate } from 'graphql';
import { createDataLoaders } from './create-data-loaders.js';
import depthLimit from 'graphql-depth-limit';

const DEPTH_LIMIT = 5;

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
      try {
        const validationRules = [depthLimit(DEPTH_LIMIT)];

        const validationErrors = validate(graphQLSchema, parse(query), validationRules);
        if (validationErrors.length) {
          return { errors: validationErrors };
        }

        const dataLoaders = createDataLoaders(prisma);
        return await graphql({
          schema: graphQLSchema,
          source: query,
          contextValue: { prisma, loaders: dataLoaders },
          variableValues: variables,
        });
      } catch (error) {
        console.error('Error in GraphQL:', error);
        if (error instanceof Error) {
          return { errors: [new GraphQLError(error.message)] };
        }
      }
    },
  });
};

export default plugin;
