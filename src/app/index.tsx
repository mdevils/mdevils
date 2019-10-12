import React from 'react';
import './styles.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {HomePage} from '../pages/home-page';

export function App() {
  return (
    <Router>
      <Route path='/' exact component={HomePage} />
    </Router>
  );
}
