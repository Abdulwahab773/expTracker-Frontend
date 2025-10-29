import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";



export default function PrivateRoute() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let local = localStorage.getItem("Token");
    setUser(local);
    setLoading(false);

  }, []);

  if (loading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/" replace />;
}