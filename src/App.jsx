import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AuthRoute from "./Routes/AuthRoute";
import PrivateRoute from "./Routes/PrivateRoute";
import Expenses from "./pages/Expenses";
import Income from "./pages/Incomes";
import FinanceProvider from "./context/FinanceProvider";
import Dashboard from "./pages/Dashboard/index.jsx";
import Sidebar from "./components/sidebar.jsx";
import Navbar from "./components/navbar.jsx";

function App() {
  const location = useLocation();

  const isDashboardRoute =
    location.pathname.startsWith("/dashboard");

  return (
    <FinanceProvider>
      <div className="flex">
        {isDashboardRoute && <Sidebar />}

        <div className="flex-1 flex flex-col">
          {isDashboardRoute && <Navbar />}

          <div className={`${isDashboardRoute ? "p-4 bg-gray-50 min-h-screen" : ""}`}>
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
          </div>
        </div>
      </div>
    </FinanceProvider>
  );
}

export default App;
