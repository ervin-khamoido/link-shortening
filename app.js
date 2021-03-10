const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

// app.use('/api/auth', require('./routes/auth.routes.js'));

const PORT = config.get('port') || 3000;

async function start() {
   try {
      await mongoose.connect(config.get('mongoURI'), {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true,
         useFindAndModify: false
      });

      app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
   } catch (error) {
      console.log('Server error: ', error.message);
      process.exit(1);
   }
}

start();