const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];
let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      for (const singleLink of links) {
        if (singleLink.id === args.id) {
          return singleLink;
        }
      }
    },
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      for (const link of links) {
        if (link.id === args.id) {
          link.description = args.description
            ? args.description
            : link.description;
          link.url = args.url ? args.url : link.url;
          return link;
        }
      }
    },
    deleteLink: (parent, args) => {
      for (let i = 1; i < links.length; i++) {
        if (links[i].id === args.id) {
          const deleted = links.splice(i, 1);
          return deleted[0];
        }
      }
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
