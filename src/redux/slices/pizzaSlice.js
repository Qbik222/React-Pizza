import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  `pizza/fetchPizzasStatus`,
  async ({ order, categories, sortBy, search }) => {
    const { data } = await axios.get(
      `https://63625e1e66f75177ea2d7159.mockapi.io/items?${
        categories > 0 ? `category=${categories}` : ''
      }&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

const initialState = {
  status: 'loading',
  items: [],
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.items = [];
      state.status = 'error';
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
