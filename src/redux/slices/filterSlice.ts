import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Sort from '../../components/Sort/Sort';
// import { title } from 'process';

export enum SortPropertyEnum {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  PRICE_DESC = 'price',
  PRICE_ASC = '-price',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
}

export type FilterSort = {
  name: string;
  id: SortPropertyEnum;
};

export interface FilterSliceState {
  categories: number;
  sort: FilterSort;
}

const initialState: FilterSliceState = {
  categories: 0,
  sort: {
    name: 'популярное',
    id: SortPropertyEnum.RATING_DESC,
  },
};

const filterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<number>) {
      state.categories = action.payload;
    },
    changeSort(state, action: PayloadAction<FilterSort>) {
      state.sort = action.payload;
    },
    setFiltres(state, action: PayloadAction<FilterSliceState>) {
      state.sort = action.payload.sort;
      state.categories = Number(action.payload.categories);
    },
  },
});

export const { setCategories, changeSort, setFiltres } = filterSlice.actions;

export default filterSlice.reducer;
