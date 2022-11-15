import React, { useState } from 'react';
import './sort.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeSort, FilterSort, SortPropertyEnum } from '../../redux/slices/filterSlice';
import { RootState } from '../../redux/store';

type SortItem = {
  name: string;
  id: SortPropertyEnum;
};

export const sortList: SortItem[] = [
  { name: 'популярности(убыванию)', id: SortPropertyEnum.RATING_DESC },
  { name: 'популярности(возрастанию)', id: SortPropertyEnum.RATING_ASC },
  { name: 'цене (убыванию)', id: SortPropertyEnum.PRICE_DESC },
  { name: 'цене(возрастанию)', id: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (убыванию)', id: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту(возрастанию)', id: SortPropertyEnum.TITLE_ASC },
];

function Sort() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const sort = useSelector((state: RootState) => state.filter.sort);
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);

  const sortName: string = sort.name;

  React.useEffect(() => {
    const onClosePopup = (e: any) => {
      if (!e.composedPath().includes(sortRef.current)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener('click', onClosePopup);
    return () => document.body.removeEventListener('click', onClosePopup);
  }, []);

  const VisiblePopup = (i: FilterSort) => {
    dispatch(changeSort(i));
    setIsVisible(false);
  };
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{sortName}</span>
      </div>

      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortList.map((item, i) => {
              return (
                <li
                  onClick={() => VisiblePopup(item)}
                  key={i}
                  className={sort.id === item.id ? 'active' : undefined}>
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
