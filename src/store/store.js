// store.js

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import expenseSlice from "../features/expenseSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    expenses : expenseSlice 
    // Add more reducers here if needed for other parts of your app's state.
  },
});

export default store;
