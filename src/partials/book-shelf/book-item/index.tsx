import * as React from 'react';
import styled from 'styled-components';
import {Book} from '../../../../lambda/get-book-shelves/src/constants';

const BookWrapper = styled.li`
  flex: 0 0 108px;
`;

const BookImage = styled.img`
  width: 100%;
  transition: transform 0.1s ease-in;
  transform: scale(1);
`;

const BookImageWrapper = styled.div`
  width: 100%;
  height: 145px;
  overflow: hidden;
`;

const BookTitle = styled.div`
  margin-top: 5px;
  font-size: 12px;
  width: 100%;
  line-height: 14px;
  height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  box-orient: vertical;
`;

const BookLink = styled.a`
  display: block;
  padding: 5px;
  &:hover {
    background: #eee;
    ${BookImage} {
      transform: scale(1.1);
    }
  }
`;

export function BookItem({book}: {book: Book}) {
  return (
    <BookWrapper>
      <BookLink href={book.link}>
        <BookImageWrapper>
          <BookImage src={book.imageUrl} alt={book.title} />
        </BookImageWrapper>
        <BookTitle>{book.title}</BookTitle>
      </BookLink>
    </BookWrapper>
  );
}
