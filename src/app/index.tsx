import React from 'react';
import './styles.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {BooksPage} from '../pages/books-page';

export function App() {
  return (
    <Router>
      {/*<Route path='/' exact component={HomePage} />*/}
      <Route path='/' exact component={BooksPage} />
    </Router>
  );
}
