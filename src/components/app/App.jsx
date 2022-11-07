import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from '../Header/Header';
import Home from '../../pages/Home';
import Cart from '../../pages/Cart';
import NotFound from '../../pages/Not-found';

import './app.scss';

function App() {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div className='wrapper'>
      <Header inputValue={inputValue} setInputValue={setInputValue} />
      <div className='content'>
        <Routes>
          <Route path='/React-Pizza/' element={<Home inputValue={inputValue} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
