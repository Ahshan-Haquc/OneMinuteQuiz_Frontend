import { createSlice } from '@reduxjs/toolkit';

interface QuizState {
  quickNum: number;
}

const initialState: QuizState = {
  quickNum: 0,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuickNum: (state, action) => {
      state.quickNum = action.payload;
    },
  },
});

export const { setQuickNum } = quizSlice.actions;
export default quizSlice.reducer;
