import { LayoutDashboard, Wallet, Receipt, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Income", icon: Wallet, path: "/dashboard/income" },
    { name: "Expense", icon: Receipt, path: "/dashboard/expense" },
  ];

  const logoutUser = () => {
    localStorage.clear();
    navigate("/")
  }


  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white text-black p-2 rounded-lg shadow-lg cursor-pointer"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
      className={`fixed lg:static top-0 left-0  w-64 
        bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 
        text-white shadow-2xl flex flex-col justify-between p-6 
        transform transition-transform duration-300 z-40 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div>
          <h1 className="text-2xl font-bold mb-10 tracking-wide text-center">
            Expense Tracker
          </h1>

          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)} // close sidebar on mobile after navigation
                  className="flex items-center space-x-3 p-3 rounded-xl cursor-pointer 
                  bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <button className="flex items-center justify-center space-x-3 bg-white/10 hover:bg-white/20 text-white p-3 rounded-xl transition-all duration-300 cursor-pointer"
        onClick={logoutUser}
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
