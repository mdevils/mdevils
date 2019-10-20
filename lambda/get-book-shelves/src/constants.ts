export const goodReadsUid = '71434995';
export const goodReadsHost = `https://www.goodreads.com`;
export const publishedShelfPrefix = 'professional-';

export type Book = {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
  description: string;
  shelves: string[];
}

export type BookShelf = {
  name: string;
  title: string;
  link: string;
}

export type GetBookShelvesResult = {books: Book[], shelves: BookShelf[]};
