import { configureStore } from "@reduxjs/toolkit";
import CardSlice from "./slices/cardsSlice";
import FilterSlise from "./slices/filterSlice";
import SortsSlise from "./slices/sortSlice";
import cartSlice from "./slices/cartSlice";
import SearchSlice from './slices/searchSlice'

export const store = configureStore({
  reducer: {
    cards: CardSlice,
    filters: FilterSlise,
    sorts: SortsSlise,
    carts: cartSlice,
    search: SearchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
