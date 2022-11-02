import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Categories from '../Categories/Categories';
import Sort from '../Sort/Sort';
import PizzaBlock from '../Pizza-block/Pizza-block';
import './app.scss';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('https://63625e1e66f75177ea2d7159.mockapi.io/items')
      .then((res) => res.json())
      .then((res) => setItems(res));
  }, []);

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {items.map((obj) => {
              return <PizzaBlock {...obj} key={obj.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
