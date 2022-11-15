import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import {
  FilterSliceState,
  setCategories,
  setFiltres,
  FilterSort,
} from '../redux/slices/filterSlice';
import { sortList } from '../components/Sort/Sort';
import { fetchPizzas, SearchPizzaParams } from '../redux/slices/pizzaSlice';

import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/Pizza-block/Pizza-block';
import Skeleton from '../components/Pizza-block/Skeleton';
import Categories from '../components/Categories/Categories';
import { RootState, useAppDispatch } from '../redux/store';

type HomeProps = {
  inputValue: string;
};

const Home: React.FC<HomeProps> = ({ inputValue }) => {
  const { items, status } = useSelector((state: RootState) => state.pizza);
  const categories = useSelector((state: RootState) => state.filter.categories);
  const sort = useSelector((state: RootState) => state.filter.sort);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearchRef = useRef(false);
  const isMounted = useRef(false);

  // const [items, setItems] = useState([]);
  // const [loading, setLoading] = useState(false);

  const getPizzas = async () => {
    const order = sort.id.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.id.replace('-', '');
    const search = inputValue ? `&search=${inputValue}` : '';

    dispatch(
      fetchPizzas({
        order,
        categories: String(categories),
        sortBy,
        search,
      }),
    );
  };

  const onClickCategory = (id: number) => {
    dispatch(setCategories(id));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

      const sort = sortList.find((obj) => obj.id === params.sortBy);

      // if (sort) {
      //   params.sortBy = sort

      // }
      dispatch(
        setFiltres({
          categories: Number(params.categories),
          sort: sort || sortList[0],
        }),
      );
    }
    isSearchRef.current = true;
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();

    isSearchRef.current = false;
  }, [categories, sort, inputValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.id,
        categories,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categories, sort, inputValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categories} changeCategories={(i) => onClickCategory(i)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка :С </h2>
          <p> Не удалось получить пиццы пропробуйте позже</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(20)].map((_, i) => <Skeleton key={i} />)
            : items.map((obj: any) => {
                return <PizzaBlock {...obj} key={obj.id} />;
              })}
        </div>
      )}
    </div>
  );
};

export default Home;
