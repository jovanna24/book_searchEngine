const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        getSingleUser: async (_, { userId, username }, { user })=> {
            try {
                const foundUser = await User.findOne({
                    $or: [{ _id: userId ? userId : user._id }, { username: username }],
                });
                if (!foundUser) {
                    throw new Error('User not found!');
                }
                return foundUser;
            } catch (err) {
                throw new Error(err.message);
            }
        },
    },
    Mutation: {
        creteUser: async (_, { userInput }) => {
            try {
                const user = await User.create(userInput);
                if (!user) {
                    throw new Error('Could not create user!');
                }
                const token = signToken(user);
                return { token, user };
            } catch (err) {
                throw new Error(err.message);
            }
        }, 
        login: async (_, { usernameOrEmail, password }) => {
            try {
                const user = await User.findOne({
                    $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
                });
            }
        }
    }
}