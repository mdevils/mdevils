import * as React from 'react';
import styled from 'styled-components';
import {Book} from '../../../lambda/get-book-shelves/src/constants';
import {Heading} from '../../components/heading';
import {breakpoints} from '../../tokens/breakpoints';
import {BookItem} from './book-item';

export const BookShelfBookList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  margin: 0 0 0 -5px;
  padding: 0;
  width: 100%;
  overflow: hidden;
  position: relative;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 20px;
    background: linear-gradient(
      to right,
      rgba(255,255,255,0.25) 0%,
      rgba(255,255,255,0.25) 33%,
      rgba(255,255,255,0.5) 33%,
      rgba(255,255,255,0.5) 66%,
      rgba(255,255,255,0.75) 66%,
      rgba(255,255,255,0.75) 100%
    );
  }
`;

const BookShelfWrapper = styled.section`
  margin-top: 10px;
`;

const BookShelfLink = styled.a`
  color: black;
`;

const BookShelfHeadingWrapper = styled.div`
  @media (${breakpoints.tablet}) {
    width: 180px;
    position: absolute;
    transform-origin: left center;
    transform: rotateZ(-90deg);
    margin-left: -20px;
    margin-top: 180px;
    text-align: right;
  }
`;

export function BookShelf({books, title, link, name}: {books: Book[], title: string, link: string, name: string}) {
  return (
    <BookShelfWrapper aria-labelledby={name}>
      <BookShelfHeadingWrapper>
        <Heading level={2} id={name}>
          <BookShelfLink href={link}>
            {title}
          </BookShelfLink>
        </Heading>
      </BookShelfHeadingWrapper>
      <BookShelfBookList>
        {books.map((book) => <BookItem book={book} key={book.id} />)}
      </BookShelfBookList>
    </BookShelfWrapper>
  );
}

