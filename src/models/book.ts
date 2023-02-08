import { Schema, model } from 'mongoose';
import { IBook } from '../types/types';

const bookSchema = new Schema<IBook>({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  authors: {
    type: String,
  },
  favorite: {
    type: String,
  },
  fileCover: {
    type: String,
  },
  fileName: {
    type: String,
  },
});

module.exports = model('Book', bookSchema);
