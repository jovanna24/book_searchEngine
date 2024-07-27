// Import the User model and the signToken and AuthenticationError functions from the auth utility file
const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

// Define the resolvers object which contains the resolver functions for each GraphQL operation (query, mutation)
const resolvers = {
    // Define the resolver function for the getSingleUser query
    Query: {
        // The function takes in the context object, which contains the user object, and the arguments object which contains the userId and username
        getSingleUser: async (_, { userId, username }, { user })=> {
            try {
                // Find a user either by their id or username
                const foundUser = await User.findOne({
                    $or: [{ _id: userId ? userId : user._id }, { username: username }],
                });
                // If no user is found, throw an error
                if (!foundUser) {
                    throw new Error('User not found!');
                }
                // Return the found user
                return foundUser;
            } catch (err) {
                // If an error occurs, throw an error with the error message
                throw new Error(err.message);
            }
        },
    },
    // Define the resolver function for the Mutation type
    Mutation: {
        // Define the resolver function for the creteUser mutation
        creteUser: async (_, { userInput }) => {
            try {
                // Create a new user using the userInput
                const user = await User.create(userInput);
                // If the user was not created, throw an error
                if (!user) {
                    throw new Error('Could not create user!');
                }
                // Create a token for the user and return it along with the user object
                const token = signToken(user);
                return { token, user };
            } catch (err) {
                // If an error occurs, throw an error with the error message
                throw new Error(err.message);
            }
        }, 
        // Define the resolver function for the login mutation
        login: async (_, { usernameOrEmail, password }) => {
            try {
                // Find a user either by their username or email
                const user = await User.findOne({
                    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
                });
                // If no user is found, throw an error
                if (!user) {
                    throw new Error('User not found!');
                }
                // Check if the password is correct
                const correctPw = await user.isCorrectPassword(password);
                // If the password is incorrect, throw an error
                if (!correctPw) {
                    throw new Error('Wrong password!');
                }
                // Create a token for the user and return it along with the user object
                const token = signToken(user);
                return { token, user };
            } catch (err) {
                // If an error occurs, throw an error with the error message
                throw new Error(err.message);
            }
        }, 
        // Define the resolver function for the saveBook mutation
        saveBook: async (_, { bookData }, { user }) => {
            try {
                // Find the user and update their savedBooks array by adding the bookData
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true, runValidators: true }
                );
                // If the user was not updated, throw an error
                if (!updatedUser) {
                    throw new Error('Could not save book!');
                }
                // Return the updated user
                return updatedUser;
            } catch (err) {
                // If an error occurs, throw an error with the error message
                throw new Error(err.message);
            }
        },
        // Define the resolver function for the deleteBook mutation
        deleteBook: async (_, { bookId }, { user }) => {
            try {
                // Find the user and update their savedBooks array by removing the book with the matching bookId
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                );
                // If the user was not updated, throw an error
                if (!updatedUser) {
                    throw new Error('Could not delete book!');
                }
                // Return the updated user
                return updatedUser;
            } catch (err) {
                // If an error occurs, throw an error with the error message
                throw new Error(err.message);
            }
        },
    },
}; 

// Export the resolvers object
module.exports = resolvers;
