import { useState, createContext } from "react";

export const C_Provider = createContext();


export default function Context({ children }) {
    const [ShowSom, setShowSom] = useState(1);
  return (
    <C_Provider.Provider value={{ ShowSom, setShowSom }}>
        {children}
    </C_Provider.Provider>
  );
}
