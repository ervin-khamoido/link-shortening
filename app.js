const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/link', require('./routes/link.routes.js'));
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
   app.use('/', express.static(path.join(__dirname, 'client', 'build')));

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

const PORT = config.get('port') || 5000;

async function start() {
   try {
      await mongoose.connect(process.env.MONGODB_URI || config.get('mongoURI'), {
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