import * as https from 'https';
import {parseString} from 'xml2js';
import {Cache} from './cache';

const GR_KEY = 'I07N29OlRNZJKOyyjEbRg';
const GR_UID = '71434995';
const GR_HOST = `https://www.goodreads.com`;

const DAY = 1000 * 60 * 60 * 24;

type Book = {
  id: string;
  title: string;
  small_image_url: string;
  link: string;
  description: string;
  shelves: string[];
}

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

const BOOKS_PER_PAGE = 10;

async function getBooksOnPage(page: number): Promise<{
  books: Book[],
  pageCount: number
}> {
  const booksResult = (await requestXml(
    `${GR_HOST}/review/list/${GR_UID}.xml?key=${GR_KEY}&v=2&per_page=${BOOKS_PER_PAGE}&page=${page}`
  )).GoodreadsResponse.reviews[0];
  return {
    books: booksResult.review.map(({
      book: [book],
      shelves: grShelves
    }: any) => {
      const shelves = (grShelves ? grShelves[0].shelf : []).map(({$: {name}}: any) => name);
      return {
        id: book.id[0]._,
        title: book.title[0],
        small_image_url: book.small_image_url[0],
        link: book.link[0],
        shelves
      };
    }),
    pageCount: Math.ceil(parseInt(booksResult.$.total, 10) / BOOKS_PER_PAGE)
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

const cache = new Cache(DAY, getAllBooks);

export async function handler() {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(await cache.get())
  };
}
