// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks-app');

// module.exports = mongoose.connection;


const mongoose = require('mongoose');

// Replace 'googlebooks-app' with your actual database name
const uri = 'mongodb://127.0.0.1:27017/googlebooks-app';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = mongoose.connection;
