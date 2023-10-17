import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import Papa from "papaparse"; // Import Papaparse

const initialState = {
  expenses: [],
  activePremium: false,
  darkTheme: false,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpense: (state, action) => {
      state.expenses = [...action.payload];
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    editExpense: (state, action) => {
      const { id, updatedExpense } = action.payload;
      const index = state.expenses.findIndex((expense) => expense.id === id);
      if (index !== -1) {
        state.expenses[index] = updatedExpense;
      }
    },
    deleteExpense: (state, action) => {
      const id = action.payload;
      state.expenses = state.expenses.filter((expense) => expense.id !== id);
    },
    toggleActivePremium: (state) => {
      state.activePremium = !state.activePremium;
    },
    getExpensesAsJSON: (state) => {
      return state.expenses;
    },
    toggleDarkTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const selectActivePremium = createSelector(
  (state) => state.expenses.activePremium,
  (activePremium) => activePremium
);
export const selectDarkTheme = (state) => state.expenses.darkTheme;

export const {
  setExpense,
  addExpense,
  editExpense,
  deleteExpense,
  toggleActivePremium,
  getExpensesAsJSON,
  toggleDarkTheme,
} = expenseSlice.actions;
export default expenseSlice.reducer;
