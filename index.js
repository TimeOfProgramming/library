const express = require('express');
const indexRouter = require('./routes/routes')


const app = express();
app.use(express.json());

app.use('/api/books', indexRouter)

app.post('/api/user/login', (_, res) => {
  res.status(201)
  res.json({ id: 1, mail: "test@mail.ru" })
});


const PORT = process.env.PORT || 3000;
app.listen(PORT);