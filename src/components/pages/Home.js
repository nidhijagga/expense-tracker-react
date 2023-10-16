import React, { useState } from "react";

const categories = ["Food", "Transport", "Shopping", "Entertainment", "Others"];

function Home() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: "",
    description: "",
    category: "",
    price: "",
  });

  const addExpense = () => {
    // Check if any of the input fields is empty
    if (
      newExpense.date === "" ||
      newExpense.description === "" ||
      newExpense.category === "" ||
      newExpense.price === ""
    ) {
      alert("Please fill in all fields before adding an expense.");
      return; // Exit the function
    }

    setExpenses([...expenses, newExpense]);
    setNewExpense({
      date: "",
      description: "",
      category: "",
      price: "",
    });
  };

  const editExpense = (index) => {
    // Implement edit functionality here
  };

  const deleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="min-h-screen p-4 bg-blue-200 text-blue-950">
      <h2 className="text-2xl font-bold mb-4">Expense Tracker</h2>

      {/* Add Expense Form */}
      <div className="mb-4">
        <h3 className="text-xl font-bold">Add Expense</h3>
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
          <button
            onClick={addExpense}
            className="py-2 px-4 bg-blue-950 text-white rounded hover:bg-blue-800"
          >
            Add
          </button>
        </div>
      </div>

      {/* Expenses List */}
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
                    onClick={() => editExpense(index)}
                    className="text-blue-950 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteExpense(index)}
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
