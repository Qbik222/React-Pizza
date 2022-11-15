import React from 'react';
import './categories.scss';

type CategoriesProps = {
  value: number;
  changeCategories: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = ({ value, changeCategories }) => {
  const categoties = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categoties.map((item: string, i: number) => {
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
};

export default Categories;
