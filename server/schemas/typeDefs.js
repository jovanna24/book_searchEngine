const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    me: User
    getSingleUser(userId: ID, username: String): User
  }

  type Mutation {
    login(usernameOrEmail: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    deleteBook(bookId: ID!): User
    createUser(userInput: UserInput!): Auth
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int 
    savedBooks: [Book]
  }

  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: String
    user: User
  }

  input BookInput {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  input UserInput {
    username: String
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;
