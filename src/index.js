const { PrismaClient } = require('@prisma/client');
const { GraphQLServer } = require('graphql-yoga');
const { PubSub } = require('graphql-yoga');

const Query = require('./resolvers/Query');
const Link = require('./resolvers/Link');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Vote = require('./resolvers/Vote');

const Subscription = require('./resolvers/Susbcription');

const prisma = new PrismaClient();
const pubsub = new PubSub();

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
      pubsub,
    };
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
