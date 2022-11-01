import React from 'react';
import Header from '../Header/Header';
import Categories from '../Categories/Categories';
import Sort from '../Sort/Sort';
import PizzaBlock from '../Pizza-block/Pizza-block';
import './app.scss';
import pizzas from '../../assets/pizzas.json';

function App() {
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
            {pizzas.map((obj) => {
              const { id, imageUrl, title, types, sizes, price, category, raiting } = obj;

              return (
                <PizzaBlock
                  id={id}
                  imageUrl={imageUrl}
                  title={title}
                  types={types}
                  sizes={sizes}
                  price={price}
                  category={category}
                  raiting={raiting}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
