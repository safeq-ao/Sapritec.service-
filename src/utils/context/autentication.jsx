import { useState, createContext } from "react";

export const CProvider = createContext([]);

export default function Context({ children }) {
    const [logged, setLogged] = useState(false);
  return (
    <CProvider.Provider value={{ logged, setLogged   }}>
      {children}
    </CProvider.Provider>
  );
}
