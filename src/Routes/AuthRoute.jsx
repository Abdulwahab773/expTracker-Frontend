import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoute() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let local = localStorage.getItem("token");
    setUser(local);
    setLoading(false);

  }, []);


  if (loading) return <div>Loading...</div>;

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}