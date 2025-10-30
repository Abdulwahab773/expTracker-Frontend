import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AuthRoute from "./Routes/AuthRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import Expenses from "./pages/Expenses";
import Income from "./pages/Incomes";
import FinanceProvider from "./context/FinanceProvider";

function App() {
  return (
    <>
      <FinanceProvider>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route index element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/expense" element={<Expenses />} />
            <Route path="/dashboard/income" element={<Income />} />
          </Route>
        </Routes>
      </FinanceProvider>
    </>
  );
}

export default App;
