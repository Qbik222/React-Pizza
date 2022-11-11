import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { setCategories, setFiltres } from '../redux/slices/filterSlice';
import { sortList } from '../components/Sort/Sort';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/Pizza-block/Pizza-block';
import Skeleton from '../components/Pizza-block/Skeleton';
import Categories from '../components/Categories/Categories';

const Home = ({ inputValue }) => {
  const { items, status } = useSelector((state) => state.pizza);
  const categories = useSelector((state) => state.filter.categories);
  const sort = useSelector((state) => state.filter.sort);
  const dispatch = useDispatch();
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
        categories,
        sortBy,
        search,
      }),
    );
  };

  const onClickCategory = (id) => {
    dispatch(setCategories(id));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find((obj) => obj.id === params.sortProperty);

      dispatch(setFiltres({ ...params, sort }));
      isSearchRef.current = true;
    }
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
            : items.map((obj) => {
                return <PizzaBlock {...obj} key={obj.id} />;
              })}
        </div>
      )}
    </div>
  );
};

export default Home;
