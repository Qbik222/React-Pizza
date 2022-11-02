import React, { useState } from 'react';
import './categories.scss';

function Categories() {
  let [activeIndex, setActiveIndex] = useState(0);
  const categoties = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const changeCategory = (i) => {
    setActiveIndex(i);
  };

  return (
    <div className='categories'>
      <ul>
        {categoties.map((value, i) => {
          return (
            <li
              key={value}
              onClick={() => changeCategory(i)}
              className={activeIndex === i ? 'active' : ''}>
              {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
