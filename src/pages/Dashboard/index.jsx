import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FinanceContext } from "../../context/FinanceContext";

const Dashboard = () => {

  const { income, expense } = useContext(FinanceContext);

  return (
      <div>
        Dashboard Page:
        <br />
        <br />
        <Link className="hover:underline" to={"/dashboard/expense"}>
          Expense : {expense} 
        </Link>
        <br />
        <br />
        <Link className="hover:underline" to={"/dashboard/income"}>
          Income : {income}
        </Link>
      </div>
  );
};

export default Dashboard;
