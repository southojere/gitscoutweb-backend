const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const resolvers = require('./resolvers');
const GitHubAPI = require('./datasources/github');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        gitHubAPI: new GitHubAPI()
    }),
    engine: {
      apiKey: "service:southojere-3026:u5zSDropsxWd7-BQe7EDEA"
      }
  });
  
  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });