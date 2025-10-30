import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FinanceContext } from '../../context/FinanceContext';

const Expenses = () => {

  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [date, setDate] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [allExpenses, setAllExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);


  
  const {setExpense} = useContext(FinanceContext);

const countExpense = () => {
  const total = allExpenses.reduce((acc, curVal) => {
    return acc + Number(curVal.expenseAmount);
  }, 0);
  setTotalExpense(total);
  setExpense(totalExpense);
};

useEffect(() => {
    countExpense()
})





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
    <div>
      <h2>This is Expense Page:</h2>
      <br />
      <div>
        <input
          onChange={(e) => setExpenseTitle(e.target.value)}
          type="text"
          placeholder="Enter Your Expense Title"
        />
        <input
          onChange={(e) => setExpenseAmount(e.target.value)}
          type="number"
          placeholder="Enter Your Amount"
        />
        <input onChange={(e) => setDate(e.target.value)} type="date" />
        <br />
        <br />
        <button onClick={addExpense} className="cursor-pointer">
          Submit
        </button>
      </div>

      <br />
      <div className="flex gap-5 items-center">
        <h1>Your Expenses:</h1>
        <h1>{totalExpense}</h1>
        <button
          onClick={() => getExpense(token, userId)}
          className="cursor-pointer"
        >
          Refresh
        </button>
      </div>

      <br />
      {allExpenses.length > 0 ? (
        allExpenses.map((val, ind) => (
          <div key={ind}>
            <h3>{val.expenseTitle}</h3>
            <p>Amount: {val.expenseAmount}</p>
            <p>Date: {val.date}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No income records found.</p>
      )}
    </div>
  );
}

export default Expenses;