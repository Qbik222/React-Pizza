import React from 'react';
import './categories.scss';

function Categories({ value, changeCategories }) {
  const categoties = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className='categories'>
      <ul>
        {categoties.map((item, i) => {
          return (
            <li
              key={item}
              onClick={() => changeCategories(i)}
              className={value === i ? 'active' : ''}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
