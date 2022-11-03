import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Home from '../../pages/Home';
import Cart from '../../pages/Cart';
import NotFound from '../../pages/Not-found';

import './app.scss';

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
