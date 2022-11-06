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
  },
});

export const { setCategories, changeSort } = filterSlice.actions;

export default filterSlice.reducer;
