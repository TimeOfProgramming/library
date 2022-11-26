const express = require('express');
const { v4: uuidv4 } = require('uuid');

class Book {
  constructor(title = '', description='', authors='', favorite = '', fileCover = '', fileName = '', id = uuidv4()) {
    this.id = id,
    this.title = title,
    this.description = description,
    this.authors = authors,
    this.favorite = favorite,
    this.fileCover = fileCover,
    this.fileName = fileName
  }
}

const store = {
  books: []
}

const app = express();
app.use(express.json());

app.post('/api/user/login', (_, res) => {
  res.status(201)
  res.json({ id: 1, mail: "test@mail.ru" })
});

app.get('/api/books', (_, res) => {
  const { books } = store;
  res.json(books);
});

app.get('/api/books/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex(item => item.id === id);

  if (idx !== -1) {
    res.json(books[idx])
  } else {
    res.status(404);
    res.json('данные не найдены')
  }
});

app.post('/api/books', (req, res) => {
  const { books } = store;
  const {
    title, 
    description, 
    authors, 
    favorite, 
    fileCover, 
    fileName
  } = req.body;

  const newBook = new Book(
    title, 
    description, 
    authors, 
    favorite, 
    fileCover, 
    fileName
  );

  books.push(newBook);
  res.json(newBook);
});

app.put('/api/books/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;

  const {
    title, 
    description, 
    authors, 
    favorite, 
    fileCover, 
    fileName
  } = req.body;

  const idx = books.findIndex(item => item.id === id);

  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      title, 
      description, 
      authors, 
      favorite, 
      fileCover, 
      fileName,
    }
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('данные не найдены')
  }
});

app.delete('/api/books/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;

  const idx = books.findIndex(item => item.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json('ok')
  } else {
    res.status(404);
    res.json('данные не найдены')
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);