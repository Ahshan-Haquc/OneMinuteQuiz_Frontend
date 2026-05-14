import { createSlice } from '@reduxjs/toolkit';

interface UiState {
  darkMode: boolean;
}

const getInitialDarkMode = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('darkMode') === 'true';
  }
  return false;
};

const initialState: UiState = {
  darkMode: getInitialDarkMode(),
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      if (typeof window !== 'undefined') {
        const root = window.document.documentElement;
        if (action.payload) {
          root.classList.add('dark');
          localStorage.setItem('darkMode', 'true');
        } else {
          root.classList.remove('dark');
          localStorage.setItem('darkMode', 'false');
        }
      }
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      if (typeof window !== 'undefined') {
        const root = window.document.documentElement;
        if (state.darkMode) {
          root.classList.add('dark');
          localStorage.setItem('darkMode', 'true');
        } else {
          root.classList.remove('dark');
          localStorage.setItem('darkMode', 'false');
        }
      }
    },
  },
});

export const { setDarkMode, toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;
