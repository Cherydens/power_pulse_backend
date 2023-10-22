const mongoose = require('mongoose');

const app = require('./app');


// Retrieve environment variables
const { DB_HOST, PORT = 3000 } = process.env;

// Enable strict query mode in Mongoose
mongoose.set('strictQuery', true);

// Connect to the MongoDB database
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, async () => {
      

      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

// Export the MongoDB server
module.exports = {
  mongoose,
  connect: () => {
    mongoose.connect(DB_HOST);
  },
  disconnect: done => {
    mongoose.disconnect(done);
  },
};
