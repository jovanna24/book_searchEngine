import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    token
    user {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
}
`;  

// export const ADD_USER = gql`
//     mutation addUser($username: String!, $email: String!, $password: String!) {
//         addUser(username: $username, email: $email, password: $password) {
//             token
//             user {
//                 _id
//                 username
//             }
//         }
//     }
// `;

export const ADD_USER = gql`
mutation createUser($userInput: UserInput!) {
  createUser(userInput: $userInput) {
    token
    user {
      _id
      username
      email
    }
  }
}
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookData: BookInput!) {
        saveBook(bookData: $bookData) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation deleteBook($bookId: ID!) {
  deleteBook(bookId: $bookId) {
    _id
    username
    email
    bookCount
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }
}
`;