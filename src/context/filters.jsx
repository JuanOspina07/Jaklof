import { createContext, useState } from 'react';

export const FiltersContext = createContext();

export function FiltersProvider({ children }) {
  // Cambia el valor inicial de minPrice a un número entero (por ejemplo, 50000)
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 50000
  });

  return (
    <FiltersContext.Provider value={{
      filters,
      setFilters
    }}>
      {children}
    </FiltersContext.Provider>
  );
}
