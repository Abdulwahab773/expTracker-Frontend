import React, { useState } from "react";
import { FinanceContext } from "./FinanceContext.jsx";

const FinanceProvider = ({ children }) => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  return (
    <FinanceContext.Provider value={{ income, setIncome, expense, setExpense }}>
      {children}
    </FinanceContext.Provider>
  );
};

export default FinanceProvider;
