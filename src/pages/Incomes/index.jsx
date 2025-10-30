import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FinanceContext } from "../../context/FinanceContext";

const Income = () => {
  const [incomeTitle, setIncomeTitle] = useState("");
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [date, setDate] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [allIncomes, setAllIncomes] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const {setIncome} = useContext(FinanceContext)


const countIncome = () => {
  const total = allIncomes.reduce((acc, curVal) => {
    return acc + curVal.incomeAmount;
  }, 0);
  setTotalIncome(total)
  setIncome(totalIncome);
};

useEffect(() => {
    countIncome()
})





  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    setToken(storedToken);
    setUserId(storedUserId);

    if (storedToken && storedUserId) {
      getIncome(storedToken, storedUserId);
    }
  }, []);

  const getIncome = async (token, userId) => {
    countIncome();

    try {
      const url = "http://localhost:5000/getIncome";
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      });

      if (res.data && res.data.data) {
        setAllIncomes(res.data.data);
      } else {
        setAllIncomes([]);
      }
    } catch (error) {
      console.error(
        "Error fetching incomes:",
        error.response?.data || error.message
      );
    }
  };

  const addIncome = async () => {
    try {
      const url = "http://localhost:5000/createIncome";

      const incObj = {
        incomeTitle,
        incomeAmount,
        date,
        userId,
      };

      const res = await axios.post(url, incObj, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Income Added Successfully:", res.data);

      getIncome(token, userId);
    } catch (err) {
      console.error("Error adding income:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>This is Income Page:</h2>
      <br />
      <div>
        <input
          onChange={(e) => setIncomeTitle(e.target.value)}
          type="text"
          placeholder="Enter Your Income Title"
        />
        <input
          onChange={(e) => setIncomeAmount(e.target.value)}
          type="number"
          placeholder="Enter Your Amount"
        />
        <input onChange={(e) => setDate(e.target.value)} type="date" />
        <br />
        <br />
        <button onClick={addIncome} className="cursor-pointer">
          Submit
        </button>
      </div>

      <br />
      <div className="flex gap-5 items-center">
        <h1>Your Incomes:</h1>
        <h1>{totalIncome}</h1>
        <button
          onClick={() => getIncome(token, userId)}
          className="cursor-pointer"
        >
          Refresh
        </button>
      </div>

      <br />
      {allIncomes.length > 0 ? (
        allIncomes.map((val, ind) => (
          <div key={ind}>
            <h3>{val.incomeTitle}</h3>
            <p>Amount: {val.incomeAmount}</p>
            <p>Date: {val.date}</p>
            <hr />
          </div>
        ))
      ) : (
        <p>No income records found.</p>
      )}
    </div>
  );
};

export default Income;
