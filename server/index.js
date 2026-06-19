require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

connectDB();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://focal-length-media.vercel.app',
    'https://focal-length-media-git-main-chukwunweike-michaels-projects.vercel.app'
  ]
}));

app.use(express.json());

app.use('/api/contact', require('./routes/contact'));
app.use('/api/admin',   require('./routes/admin'));

app.get('/', (req, res) =>
  res.json({ status: 'FLM Backend running', db: 'MongoDB Atlas' })
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server on port ${PORT}`)
);
