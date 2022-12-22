const express = require('express');

const router = express.Router();
const path = require('path');
const fileMulter = require('../middleware/file');
const BookShema = require('../models/book');

const store = {
  books: [],
};

router.get('/', async (_, res) => {
  try {
    const books = await BookShema.find().select('-__v');
    res.json(books);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookShema.findById(id).select('-__v');
    res.json(book);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.post('/', fileMulter.single('book'), async (req, res) => {
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  let fileInfo = '';

  if (req.file) {
    fileInfo = req.file?.filename;
  }

  const newBook = new BookShema({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileInfo,
  });

  try {
    const book = await newBook.save();
    res.json(book);
  } catch (e) {
    res.status(404).json(e);
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  let fileInfo = '';

  if (req.file) {
    fileInfo = req.file?.filename;
  }

  try {
    await BookShema.findByIdAndUpdate(id, {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileInfo,
    });
    res.json('данные обновлены');
  } catch (e) {
    res.status(404).json(e);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await BookShema.deleteOne({ _id: id });
    res.json('ok');
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/view/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookShema.findById(id).select('-__v');
    res.render('book/view', {
      title: 'Информация по конкретной книге',
      book,
    });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get('/create', (req, res) => {
  res.render('book/create', {
    title: 'Создание книги',
  });
});

router.post('/create', async (req, res) => {
  const { title, description, authors } = req.body;

  const newBook = new BookShema({
    title,
    description,
    authors,
  });

  try {
    await newBook.save();
    res.redirect('index');
  } catch (e) {
    res.status(404).json(e);
  }
});

router.get('/update/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await BookShema.findById(id);
    res.render('book/update', {
      title: 'Обновление книги',
      book,
    });
  } catch (e) {
    res.status(404).json(e);
  }
});

router.post('/update/:id', async (req, res) => {
  const { id } = req.params;

  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;

  let fileInfo = '';

  if (req.file) {
    fileInfo = req.file?.filename;
  }

  try {
    await BookShema.findByIdAndUpdate(id, {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileInfo,
    });
    res.json('данные обновлены');
  } catch (e) {
    res.status(500).json(e);
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

module.exports = router;
