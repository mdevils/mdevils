import * as https from 'https';
import {parseString} from 'xml2js';
import {Cache} from './cache';
import {Book, BookShelf, GetBookShelvesResult, goodReadsHost, goodReadsUid, publishedShelfPrefix} from './constants';

const goodReadsKey = 'I07N29OlRNZJKOyyjEbRg';
const openLibraryCoverUrl = 'http://covers.openlibrary.org/b/isbn/{isbn}-M.jpg';

const DAY = 1000 * 60 * 60 * 24;

function request(url: string): Promise<Buffer> {
  const buffers: Buffer[] = [];
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      res.on('data', (buffer) => {
        buffers.push(buffer);
      });
      res.on('end', () => {
        resolve(Buffer.concat(buffers));
      })
    }).on('error', (e) => {
      reject(e);
    });
  });
}

function parseXml(xml: string): any {
  return new Promise((resolve, reject) => {
    parseString(xml, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    })
  });
}

async function requestXml(url: string): Promise<any> {
  return await parseXml((await request(url)).toString('utf8'));
}

const dashedCaseToSentence = (text: string) => text[0].toUpperCase() + text.slice(1).replace(/-/g, ' ');

const booksPerPage = 10;

async function getBooksOnPage(page: number): Promise<{
  books: Book[],
  pageCount: number
}> {
  const booksResult = (await requestXml(
    `${goodReadsHost}/review/list/${goodReadsUid}.xml?key=${goodReadsKey}&v=2&per_page=${booksPerPage}&page=${page}`
  )).GoodreadsResponse.reviews[0];
  return {
    books: booksResult.review.map(({
      book: [book],
      shelves: grShelves
    }: any) => {
      const shelves = (grShelves ? grShelves[0].shelf : []).map(({$: {name}}: any) => name)
        .filter((shelf: string) => shelf.indexOf(publishedShelfPrefix) === 0);
      const isbn = book.isbn[0];
      let imageUrl = book.image_url[0];
      if (imageUrl.indexOf('nophoto') !== -1) {
        imageUrl = openLibraryCoverUrl.replace('{isbn}', isbn);
      }
      return {
        id: book.id[0]._,
        title: book.title[0],
        imageUrl: imageUrl,
        link: book.link[0],
        shelves
      };
    }).filter((book: Book) => book.shelves.length > 0),
    pageCount: Math.ceil(parseInt(booksResult.$.total, 10) / booksPerPage)
  }
}

async function getAllBooks(): Promise<Book[]> {
  const firstResult = await getBooksOnPage(1);
  let resultBooks = firstResult.books;
  const pageCount = firstResult.pageCount;
  const results = await Promise.all(Array.from({length: pageCount - 1}).map(async (_, index) => {
    return (await getBooksOnPage(index + 2)).books;
  }));
  return resultBooks.concat(...results);
}

async function getAllBookShelves(): Promise<BookShelf[]> {
  const shelvesResult = (await requestXml(
    `${goodReadsHost}/shelf/list.xml?key=${goodReadsKey}&user_id=${goodReadsUid}`
  )).GoodreadsResponse.shelves[0];
  return (shelvesResult.user_shelf as any[])
    .map(({name: [name]}: {name: [string]}) => ({name}))
    .filter(({name}) => name.indexOf(publishedShelfPrefix) === 0)
    .map(({name}) => ({
      name,
      title: dashedCaseToSentence(name.replace(publishedShelfPrefix, '')),
      link: `${goodReadsHost}/review/list/${goodReadsUid}?shelf=${name}`
    }));
}

async function getResult(): Promise<GetBookShelvesResult> {
  const [books, shelves] = await Promise.all([getAllBooks(), getAllBookShelves()]);
  return {books, shelves};
}

const cache = new Cache({
  bucketName: 'mdevils-cache',
  cacheFilename: 'get-book-shelves.json',
  expiresAfter: process.env.NO_CACHE ? 0 : DAY,
  getValue: getResult
});

export async function handler() {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(await cache.get())
  };
}
