const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const fileMulter = require('../middleware/file')
const path = require('path');
class Book {
    constructor(title = '', description='', authors='', favorite = '', fileCover = '', fileName = '', fileBook, id = uuidv4()) {
      this.id = id,
      this.title = title,
      this.description = description,
      this.authors = authors,
      this.favorite = favorite,
      this.fileCover = fileCover,
      this.fileName = fileName,
      this.fileBook = fileBook
    }
  }
  
  const store = {
    books: [],
  }

  
  router.get('/', (_, res) => {
    const { books } = store;
    res.json(books);
  });
  
  router.get('/:id', (req, res) => {
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

  router.get('/:id/download', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const idx = books.findIndex(item => item.id === id);

    if (idx !== -1) {
      res.download(path.join(__dirname, `../public/books/${books[idx].fileBook}`))
    } else {
      res.status(404);
      res.json('данные не найдены')
    }
  });
  
  router.post('/', fileMulter.single('book'), (req, res) => {
    const { books } = store;
    const {
      title, 
      description, 
      authors, 
      favorite, 
      fileCover, 
      fileName,
    } = req.body;
    
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
      fileBook = fileInfo,
    );
  
    books.push(newBook);
    res.json(newBook);
  });
  
  router.put('/:id', (req, res) => {
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
  
  router.delete('/:id', (req, res) => {
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

module.exports = router;