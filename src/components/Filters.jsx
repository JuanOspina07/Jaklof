import { useId, useState } from "react";
import { useFilters } from "../hooks/useFilters.js";
import Loader from "./Loader";
import "../styles/Filters.css";

// Función para formatear el precio en pesos colombianos
const formatCurrency = (value) => {
  return value
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export function Filters() {
  const { filters, setFilters } = useFilters();
  const [loading, setLoading] = useState(false);
  const minPriceFilterId = useId();
  const categoryFilterId = useId();

  const handleChangeMinPrice = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      minPrice: event.target.value,
    }));
  };

  const handleChangeCategory = (category) => {
    setLoading(true);
    console.log("Cargando...");

    setFilters((prevState) => ({
      ...prevState,
      category: category,
    }));

    setTimeout(() => {
      setLoading(false);
      console.log("Carga completada");
    }, 2000);
  };

  return (
    <section className="filters">
      {loading && <p>Cargando...</p>}
      <Loader show={loading} />

      <div>
        <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input
          type="range"
          id={minPriceFilterId}
          min="50000"
          max="300000"
          step="10000"
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${formatCurrency(filters.minPrice)}</span>
      </div>

      <div className="category-buttons">
        <button
          className={filters.category === "all" ? "active" : ""}
          onClick={() => handleChangeCategory("all")}
        >
          Todos
        </button>
        <button
          className={filters.category === "Men" ? "active" : ""}
          onClick={() => handleChangeCategory("Men")}
        >
          Hombres
        </button>
        <button
          className={filters.category === "Women" ? "active" : ""}
          onClick={() => handleChangeCategory("Women")}
        >
          Mujeres
        </button>
      </div>
    </section>
  );
}
