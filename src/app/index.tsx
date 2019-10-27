import React from 'react';
import './styles.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {BooksPage} from '../pages/books-page';
import {HomePage} from '../pages/home-page';
import {NotFoundPage} from '../pages/not-found-page';

export function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/books' exact component={BooksPage} />
        <Route path='*' component={NotFoundPage} />
      </Switch>
    </Router>
  );
}
