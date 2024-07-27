// Import the gql function from Apollo Server to define our GraphQL schema
const { gql } = require('apollo-server');

// Define our GraphQL schema using the gql function
const typeDefs = gql`
  // Define the Query type which will have a single field called "me" which returns a User object
  type Query {
    me: User
  }

  // Define the Mutation type which will have four fields: login, addUser, saveBook, and removeBook
  type Mutation {
    // Field to log in a user and return an Auth object which contains a token and a user object
    login(usernameOrEmail: String!, password: String!): Auth
    // Field to add a new user and return an Auth object which contains a token and a user object
    addUser(username: String!, email: String!, password: String!): Auth
    // Field to save a book for a user and return a User object
    saveBook(bookData: BookInput!): User
    // Field to remove a book from a user's saved books and return a User object
    removeBook(bookId: ID!): User
  }

  // Define the User type which will have an ID, username, email, bookCount, and an array of Book objects
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  // Define the Book type which will have an ID, an array of authors, a description, a title, an image, and a link
  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  // Define the Auth type which will have a token and a user object
  type Auth {
    token: String
    user: User
  }

  // Define the BookInput type which will have an ID, an array of authors, a description, a title, an image, and a link
  input BookInput {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
`;

// Export the typeDefs object so that it can be used in our Apollo Server
module.exports = typeDefs;

