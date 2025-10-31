import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FinanceContext } from "../../context/FinanceContext";

const Expenses = () => {
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [date, setDate] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [allExpenses, setAllExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const { setExpense } = useContext(FinanceContext);

  const countExpense = () => {
    const total = allExpenses.reduce((acc, curVal) => {
      return acc + Number(curVal.expenseAmount);
    }, 0);
    setTotalExpense(total);
    setExpense(totalExpense);
  };

  useEffect(() => {
    countExpense();
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    setToken(storedToken);
    setUserId(storedUserId);

    if (storedToken && storedUserId) {
      getExpense(storedToken, storedUserId);
    }
  }, []);

  const getExpense = async (token, userId) => {
    countExpense();

    try {
      const url = "http://localhost:5000/getExpense";
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      });

      if (res.data && res.data.data) {
        setAllExpenses(res.data.data);
      } else {
        setAllExpenses([]);
      }
    } catch (error) {
      console.error(
        "Error fetching expenses:",
        error.response?.data || error.message
      );
    }
  };

  const addExpense = async () => {
    try {
      const url = "http://localhost:5000/createExpense";

      const expObj = {
        expenseTitle,
        expenseAmount,
        date,
        userId,
      };

      const res = await axios.post(url, expObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Expense Added Successfully:", res.data);
      getExpense(token, userId);
    } catch (err) {
      console.error("Error adding expense:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Expense Tracker
        </h2>
        <p className="text-gray-500">
          Add your daily expenses and view them below.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Add New Expense
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            onChange={(e) => setExpenseTitle(e.target.value)}
            type="text"
            placeholder="Enter Your Expense Title"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            onChange={(e) => setExpenseAmount(e.target.value)}
            type="number"
            placeholder="Enter Your Amount"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            onClick={addExpense}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 cursor-pointer transition"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-800">
            Total Expense:
          </h1>
          <span className="text-2xl font-bold text-blue-600">
            Rs. {totalExpense}
          </span>
        </div>
        <button
          onClick={() => getExpense(token, userId)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 font-medium hover:bg-gray-700 cursor-pointer transition"
        >
          Refresh
        </button>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Expense Records
        </h3>

        {allExpenses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-left">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {allExpenses.map((val, ind) => (
                  <tr
                    key={ind}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 text-gray-800 font-medium">
                      {val.expenseTitle}
                    </td>
                    <td className="py-3 px-4 text-blue-600 font-semibold">
                      Rs. {val.expenseAmount}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {new Date(val.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-6">
            No expense records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Expenses;
