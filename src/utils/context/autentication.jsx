import { useState, createContext } from "react";

export const C_Provider = createContext();


export default function Context({ children }) {
    const [SetRole, Role] = useState("cliente");
  return (
    <C_Provider.Provider value={{ SetRole, Role }}>
        {children}
    </C_Provider.Provider>
  );
}
