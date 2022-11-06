import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: 0,
  sort: {
    name: 'популярное',
    id: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    changeSort(state, action) {
      state.sort = action.payload;
    },
    setFiltres(state, action) {
      state.sort = action.payload.sort;
      state.categories = Number(action.payload.categories);
    },
  },
});

export const { setCategories, changeSort, setFiltres } = filterSlice.actions;

export default filterSlice.reducer;
