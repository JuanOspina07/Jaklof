import { useId, useState } from "react";
import { useFilters } from "../hooks/useFilters.js";
import Loader from "./Loader";
import "../styles/Filters.css";

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

  const handleChangeCategory = (event) => {
    setLoading(true);
    console.log("Cargando...");

    setFilters((prevState) => ({
      ...prevState,
      category: event.target.value,
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
          min="50"
          max="1000"
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoría</label>
        <select id={categoryFilterId} onChange={handleChangeCategory}>
          <option value="all">Todos</option>
          <option value="Men">Hombres</option>
          <option value="Women">Mujeres</option>
        </select>
      </div>
    </section>
  );
}
