import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FinanceContext } from "../../context/FinanceContext";

const Dashboard = () => {
  const { income, expense, setIncome, setExpense } = useContext(FinanceContext);


  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [allIncomes, setAllIncomes] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalIncome = allIncomes.reduce(
    (acc, cur) => acc + Number(cur.incomeAmount),
    0
  );
  const totalExpense = allExpenses.reduce(
    (acc, cur) => acc + Number(cur.expenseAmount),
    0
  );
  const totalBalance = totalIncome - totalExpense;

  const COLORS = ["green", "red"];

  const getIncome = async (token, userId) => {
    try {
      const res = await axios.get("http://localhost:5000/getIncome", {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      });
      setAllIncomes(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching income:", err);
    }
  };

  const getExpense = async (token, userId) => {
    try {
      const res = await axios.get("http://localhost:5000/getExpense", {
        headers: { Authorization: `Bearer ${token}` },
        params: { userId },
      });
      setAllExpenses(res.data?.data || []);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
      Promise.all([
        getIncome(storedToken, storedUserId),
        getExpense(storedToken, storedUserId),
      ]).finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    setIncome(totalIncome);
    setExpense(totalExpense);
  }, [totalIncome, totalExpense]);

  const data = [
    { name: "Total Income", value: totalIncome, color: COLORS[0] },
    { name: "Total Expense", value: totalExpense, color: COLORS[1] },
  ];

  const transactions = [
    ...allIncomes.map((inc) => ({
      name: inc.incomeTitle,
      date: inc.date,
      amount: +inc.incomeAmount,
    })),
    ...allExpenses.map((exp) => ({
      name: exp.expenseTitle,
      date: exp.date,
      amount: -exp.expenseAmount,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 text-lg">
        Loading your data...
      </div>
    );

  return (
    <div className="flex-1 bg-gray-50 min-h-screen p-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md p-6 rounded-xl">
          <h3 className="text-gray-500 text-sm">Total Balance</h3>
          <p className="text-3xl font-semibold text-indigo-600">
            Rs {totalBalance.toLocaleString()}
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-xl">
          <h3 className="text-gray-500 text-sm">Total Income</h3>
          <p className="text-3xl font-semibold text-green-500">
            Rs {totalIncome.toLocaleString()}
          </p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-xl">
          <h3 className="text-gray-500 text-sm">Total Expense</h3>
          <p className="text-3xl font-semibold text-red-500">
            Rs {totalExpense.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white h-[450px] overflow-y-auto shadow-md rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Transactions</h3>
            
          </div>

          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 hover:bg-gray-100 p-3 rounded-lg transition"
                >
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-gray-500 text-sm">
                      {new Date(item.date).toDateString()}
                    </p>
                  </div>
                  <span
                    className={`font-semibold ${
                      item.amount > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {item.amount > 0
                      ? `+${item.amount}`
                      : `-${Math.abs(item.amount)}`}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-6">
                No recent transactions.
              </p>
            )}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-center mt-3 text-lg font-semibold text-gray-700">
            Total Balance Rs {totalBalance.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
