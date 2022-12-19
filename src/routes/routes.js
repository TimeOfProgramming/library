const axios = require('axios');

const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const path = require('path');
const fileMulter = require('../middleware/file');

const SERVICE_COUNTER = process.env.COUNTER_SERVICE;
const PORT_COUNTER = process.env.COUNTER_PORT;

class Book {
  constructor(
    title = '',
    description = '',
    authors = '',
    favorite = '',
    fileCover = '',
    fileName = '',
    fileBook,
    id = uuidv4(),
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.authors = authors;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
  }
}

const store = {
  books: [
    {
      id: '1',
      title: 'test',
    },
    {
      id: '2',
      title: 'test',
    },
  ],
};

router.get('/index', (_, res) => {
  const { books } = store;
  res.render('book/index', {
    title: 'Список всех книг',
    books,
  });
});

router.get('/view/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((item) => item.id === id);

  if (idx !== -1) {
    axios
      .post(`http://${SERVICE_COUNTER}:${PORT_COUNTER}/counter/${id}/incr`)
      .then(() => {
        axios
          .get(`http://${SERVICE_COUNTER}:${PORT_COUNTER}/counter/${id}`)
          .then((response) => {
            res.render('book/view', {
              title: 'Информация по конкретной книге',
              book: books[idx],
              count: response.data,
            });
          })
          .catch((error) => {
            res.json(error);
          });
      });
  } else {
    res.status(404);
    res.json('данные не найдены');
  }
});

router.get('/create', (req, res) => {
  res.render('book/create', {
    title: 'Создание книги',
  });
});

router.post('/create', (req, res) => {
  const { books } = store;
  const { title, description, author } = req.body;

  const newBook = new Book(title, description, author);

  books.push(newBook);
  res.redirect('index');
});

router.get('/update/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((item) => item.id === id);
  const currentBook = books[idx];

  if (idx !== -1) {
    res.render('book/update', {
      title: 'Обновление книги',
      book: currentBook,
    });
  } else {
    res.status(404);
    res.json('данные не найдены');
  }
});

router.post('/update/:id', (req, res) => {
  const { books } = store;
  const { title, description, author } = req.body;
  const { id } = req.params;

  const idx = books.findIndex((item) => item.id === id);

  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      title,
      description,
      author,
    };
  } else {
    res.status(404);
    res.json('данные не найдены');
  }
});

router.get('/', (_, res) => {
  const { books } = store;
  res.json(books);
});

router.get('/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((item) => item.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('данные не найдены');
  }
});

router.get('/:id/download', (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((item) => item.id === id);

  if (idx !== -1) {
    res.download(
      path.join(__dirname, `../public/books/${books[idx].fileBook}`),
    );
  } else {
    res.status(404);
    res.json('данные не найдены');
  }
});

router.post('/', fileMulter.single('book'), (req, res) => {
  const { books } = store;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  let fileInfo = '';

  if (req.file) {
    fileInfo = req.file?.filename;
  }

  const newBook = new Book(
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileInfo,
  );

  books.push(newBook);
  res.json(newBook);
});

router.put('/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;

  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  const idx = books.findIndex((item) => item.id === id);

  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    };
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json('данные не найдены');
  }
});

router.delete('/:id', (req, res) => {
  const { books } = store;
  const { id } = req.params;

  const idx = books.findIndex((item) => item.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json('ok');
  } else {
    res.status(404);
    res.json('данные не найдены');
  }
});

module.exports = router;
