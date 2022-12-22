const express = require('express');
const mongoose = require('mongoose');
const indexRouter = require('./routes/routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/api/books', indexRouter);

app.get('/', (_, res) => {
  res.json('главная страница');
});

app.post('/api/user/login', (_, res) => {
  res.status(201);
  res.json({ id: 1, mail: 'test@mail.ru' });
});

async function start(PORT, UrlDb) {
  try {
    await mongoose.connect(UrlDb);
    app.listen(PORT, () => {
      console.log(`=== start server PORT ${PORT} ===`);
    });
  } catch (e) {
    console.log(e);
  }
}

const PORT = process.env.PORT || 3000;
const UrlDb = process.env.URL_DB;
start(PORT, UrlDb);
