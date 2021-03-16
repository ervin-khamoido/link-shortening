const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/link', require('./routes/link.routes.js'));
app.use('/t', require('./routes/redirect.routes'));

const PORT = config.get('port') || 5000;

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