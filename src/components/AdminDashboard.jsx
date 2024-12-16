import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "../styles/Admin.css";

const AdminDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [salesData, setSalesData] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {
      setLoggedIn(true);
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  useEffect(() => {
    if (loggedIn) {
      const fetchSalesData = async () => {
        try {
          const response = await fetch("http://localhost:4000/sales");
          const data = await response.json();
          setSalesData(data);
        } catch (err) {
          console.error("Error al obtener datos de ventas:", err);
        }
      };

      fetchSalesData();
    }
  }, [loggedIn]);

  const chartData = {
    labels: salesData?.map((sale) => sale.product_name) || [],
    datasets: [
      {
        label: "Ventas por Producto",
        data: salesData?.map((sale) => sale.total_sales) || [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="admin-dashboard">
      {loggedIn ? (
        <div>
          <h1>Panel de Administrador</h1>
          {salesData ? (
            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
          ) : (
            <p>Cargando datos de ventas...</p>
          )}
        </div>
      ) : (
        <div className="login-form">
          <h2>Iniciar Sesión</h2>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Ingresar</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
