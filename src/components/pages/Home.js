import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setExpense,
  addExpense,
  editExpense,
  deleteExpense,
  toggleActivePremium,
} from "../../features/expenseSlice";
import axios from "axios";

const categories = ["Food", "Transport", "Shopping", "Entertainment", "Others"];

function Home() {
  // Use Redux selectors and dispatch
  const expenses = useSelector((state) => state.expenses.expenses);
  const activePremium = useSelector((state) => state.expenses.activePremium);
  const dispatch = useDispatch();

  const [newExpense, setNewExpense] = useState({
    date: "",
    description: "",
    category: "",
    price: "",
  });

  // New state to track the currently edited expense
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    // Fetch expenses from the provided URL
  }, [expenses, activePremium]);

  useEffect(() => {
    axios
      .get(
        "https://expense-tracker-react-5db70-default-rtdb.firebaseio.com/expenses.json"
      )
      .then((response) => {
        if (response.data) {
          const expensesData = response.data;
          const expensesArray = Object.keys(expensesData).map((id) => ({
            id,
            ...expensesData[id],
          }));
          // Initialize your Redux state with the fetched data
          dispatch(setExpense(expensesArray));
        }
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, []);

  useEffect(() => {
    const totalExpensePrice = expenses.reduce(
      (total, expense) => total + parseFloat(expense.price),
      0
    );
    if (totalExpensePrice >= 10000 && !activePremium) {
      // Dispatch the action to toggle activePremium
      dispatch(toggleActivePremium());
    }
  }, [expenses]);

  const addExpenseHandler = () => {
    if (
      newExpense.date === "" ||
      newExpense.description === "" ||
      newExpense.category === "" ||
      newExpense.price === ""
    ) {
      alert("Please fill in all fields before adding an expense.");
      return;
    }

    axios
      .post(
        "https://expense-tracker-react-5db70-default-rtdb.firebaseio.com/expenses.json",
        newExpense
      )
      .then((response) => {
        dispatch(addExpense(newExpense));
        setNewExpense({
          date: "",
          description: "",
          category: "",
          price: "",
        });
      })
      .catch((error) => {
        console.error("Error adding expense:", error);
      });
  };

  const editExpenseHandler = (expense) => {
    // Set the expense to edit
    setEditingExpense(expense);
    // Populate the input fields with the expense's values
    setNewExpense({ ...expense });
  };

  const updateExpense = () => {
    // Check if any of the input fields is empty
    if (
      newExpense.date === "" ||
      newExpense.description === "" ||
      newExpense.category === "" ||
      newExpense.price === ""
    ) {
      alert("Please fill in all fields before updating the expense.");
      return;
    }

    // Update the expense in both local state and on the server
    axios
      .put(
        `https://expense-tracker-react-5db70-default-rtdb.firebaseio.com/expenses/${newExpense.id}.json`,
        newExpense
      )
      .then(() => {
        const updatedExpenses = expenses.map((expense) =>
          expense.id === newExpense.id ? newExpense : expense
        );
        // Dispatch an action to update expenses in Redux store
        dispatch(
          editExpense({ id: newExpense.id, updatedExpense: newExpense })
        );
        // Reset the editing state
        setEditingExpense(null);
        setNewExpense({
          date: "",
          description: "",
          category: "",
          price: "",
        });
      })
      .catch((error) => {
        console.error("Error updating expense:", error);
      });
  };

  const cancelEditing = () => {
    // Reset the editing state and clear the input fields
    setEditingExpense(null);
    setNewExpense({
      date: "",
      description: "",
      category: "",
      price: "",
    });
  };

  const deleteExpenseHandler = (id) => {
    dispatch(deleteExpense(id));

    axios
      .delete(
        `https://expense-tracker-react-5db70-default-rtdb.firebaseio.com/expenses/${id}.json`
      )
      .catch((error) => {
        console.error("Error deleting expense:", error);
      });
  };

  return (
    <div className="min-h-screen p-4 bg-blue-200 text-blue-950">
      <h2 className="text-2xl font-bold mb-4">Expense Tracker</h2>

      <div className="mb-4">
        <h3 className="text-xl font-bold">Add/Edit Expense</h3>
        <div className="flex space-x-4">
          <input
            type="date"
            value={newExpense.date}
            onChange={(e) =>
              setNewExpense({ ...newExpense, date: e.target.value })
            }
            placeholder="Date"
            className="p-2 border rounded bg-blue-100"
          />
          <input
            type="text"
            value={newExpense.description}
            onChange={(e) =>
              setNewExpense({ ...newExpense, description: e.target.value })
            }
            placeholder="Description"
            className="p-2 border rounded bg-blue-100"
          />
          <select
            value={newExpense.category}
            onChange={(e) =>
              setNewExpense({ ...newExpense, category: e.target.value })
            }
            className="p-2 border rounded bg-blue-100"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={newExpense.price}
            onChange={(e) =>
              setNewExpense({ ...newExpense, price: e.target.value })
            }
            placeholder="Price (INR)"
            className="p-2 border rounded bg-blue-100"
          />
          {editingExpense ? (
            <>
              <button
                onClick={updateExpense}
                className="py-2 px-4 bg-blue-950 text-white rounded hover-bg-blue-800"
              >
                Update
              </button>
              <button
                onClick={cancelEditing}
                className="py-2 px-4 bg-red-500 text-white rounded hover-bg-red-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={addExpenseHandler}
              className="py-2 px-4 bg-blue-950 text-white rounded hover-bg-blue-800"
            >
              Add
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold">Expenses</h3>
        <table className="w-full mt-2">
          <thead>
            <tr>
              <th className="text-left">Date</th>
              <th className="text-left">Description</th>
              <th className="text-left">Category</th>
              <th className="text-left">Price (INR)</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.date}</td>
                <td>{expense.description}</td>
                <td>{expense.category}</td>
                <td>{expense.price}</td>
                <td>
                  <button
                    onClick={() => editExpenseHandler(expense)}
                    className="text-blue-950 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteExpenseHandler(expense.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
