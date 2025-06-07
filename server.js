const path = require('path');
const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5001;
const connectDB = require('./config/db');

connectDB()
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongDB conenction error', err));

const app = express();

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extende: false }));

//Home
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to RandomIdeas' });
});

const ideasRouter = require('./routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Server listening on port: ${port}`));
