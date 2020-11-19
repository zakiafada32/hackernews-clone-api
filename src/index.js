const { PrismaClient } = require('@prisma/client');
const { GraphQLServer } = require('graphql-yoga');
const Query = require('./resolvers/Query');
const Link = require('./resolvers/Link');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
