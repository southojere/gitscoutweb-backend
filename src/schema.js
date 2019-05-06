const { gql } = require('apollo-server');

const typeDefs = gql`

type Query {
  users: [User]!
  user(login: String): User!
  usersAtLocation(location: String): [User]!
}

type User {
    id: ID!
    login: String!
    email: String
    url: String
    company: String
    blog: String
    followers: Int
    avatar_url: String
}
`;

module.exports = typeDefs;