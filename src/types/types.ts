export interface IBook {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: string;
  fileCover: string;
  fileName: string;
}

export abstract class BooksRepository {
  abstract createBook(book: IBook): void;
  abstract getBook(id: string): IBook;
  abstract getBooks(): IBook[];
  abstract updateBook(id: string): void;
  abstract deleteBook(id: string): void;
}
