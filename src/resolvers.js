module.exports = {
    Query: {
        users: (_, __, { dataSources }) =>
            dataSources.gitHubAPI.getAllUsers(),
        user: (_, { login }, { dataSources }) =>
            dataSources.gitHubAPI.getUser({ login: login }),
        usersAtLocation: (_, { location }, { dataSources }) =>
            dataSources.gitHubAPI.getUsersAtLocation({ location: location }),
    }
};