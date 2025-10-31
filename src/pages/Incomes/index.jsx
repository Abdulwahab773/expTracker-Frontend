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

  const { setIncome } = useContext(FinanceContext);

  const countIncome = () => {
    const total = allIncomes.reduce((acc, curVal) => {
      return acc + Number(curVal.incomeAmount);
    }, 0);
    setTotalIncome(total);
    setIncome(totalIncome);
  };

  useEffect(() => {
    countIncome();
  });

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
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Income Tracker
        </h2>
        <p className="text-gray-500">
          Add your sources of income and view the details below.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6 mb-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Add New Income
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            onChange={(e) => setIncomeTitle(e.target.value)}
            type="text"
            placeholder="Enter Your Income Title"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            onChange={(e) => setIncomeAmount(e.target.value)}
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
            onClick={addIncome}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 cursor-pointer transition"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-800">Total Income:</h1>
          <span className="text-2xl font-bold text-blue-600">
            Rs. {totalIncome}
          </span>
        </div>
        <button
          onClick={() => getIncome(token, userId)}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 font-medium hover:bg-gray-700 cursor-pointer transition"
        >
          Refresh
        </button>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Income Records
        </h3>

        {allIncomes.length > 0 ? (
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
                {allIncomes.map((val, ind) => (
                  <tr
                    key={ind}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 text-gray-800 font-medium">
                      {val.incomeTitle}
                    </td>
                    <td className="py-3 px-4 text-blue-600 font-semibold">
                      Rs. {val.incomeAmount}
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
            No income records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Income;
