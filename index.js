const express = require('express');
const indexRouter = require('./routes/routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');

app.use('/api/books', indexRouter);

app.get('/', (_, res) => {
  res.render('index', {
    title: 'главная',
  });
});

app.post('/api/user/login', (_, res) => {
  res.status(201);
  res.json({ id: 1, mail: 'test@mail.ru' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`=== start server PORT ${PORT} ===`);
});
