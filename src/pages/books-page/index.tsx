import * as React from 'react';
import {Book, GetBookShelvesResult} from '../../../lambda/get-book-shelves/src/constants';
import {Heading} from '../../components/heading';
import {useData} from '../../lib/use-data';
import {BookShelf} from '../../partials/book-shelf';
import {PageLayout} from '../../partials/page-layout';
import memoizeOne from 'memoize-one';

const bookShelvesApiUrl = 'https://pzpzpk1ipk.execute-api.eu-central-1.amazonaws.com/default/get-book-shelves';

type GroupedBooks = {[shelfName: string]: Book[]};

const groupBooks = memoizeOne((books: Book[]): GroupedBooks => {
  const result: GroupedBooks = {};
  for (const book of books) {
    const {shelves: [shelf]} = book;
    result[shelf] = result[shelf] || [];
    result[shelf].push(book);
  }
  return result;
});

function failInCaseOfError<T>(response: T): T {
  if (
    typeof response === 'object' &&
    response !== null &&
    typeof (response as any).message === 'string'
  ) {
    throw new Error((response as any).message);
  }
  return response;
}

export function BooksPage() {
  const [content] = useData({
    async load() {
      return failInCaseOfError(await (await fetch(bookShelvesApiUrl)).json()) as GetBookShelvesResult;
    },
    render({books, shelves}: GetBookShelvesResult) {
      const groupedBooks = groupBooks(books);
      return (
        <>
          {shelves
            .filter(({name}) => name in groupedBooks)
            .map(({name, title, link}) => (
              <BookShelf
                key={name}
                name={name}
                title={title}
                link={link}
                books={groupedBooks[name]}
              />
            ))}
        </>
      );
    }
  });

  return (
    <PageLayout>
      <Heading>My book recommendations</Heading>
      {content}
    </PageLayout>
  );
}
