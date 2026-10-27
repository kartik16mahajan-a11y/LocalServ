import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  activeGroup: 'all',
  sortBy: 'popular',
};

const servicesFilterSlice = createSlice({
  name: 'servicesFilter',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setActiveGroup(state, action) {
      state.activeGroup = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setSearchTerm, setActiveGroup, setSortBy, resetFilters } = servicesFilterSlice.actions;
export default servicesFilterSlice.reducer;
