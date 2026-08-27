import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
    search: string
}

const initialState: SearchState = {
  search: '',
};

const SearchSlice = createSlice({
  name: "seacrh",
  initialState,
  reducers: {
    setValueInput(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    
  },
});

export default SearchSlice.reducer;
export const { setValueInput } = SearchSlice.actions;
