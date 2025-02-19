import { useState, createContext } from "react";

export const SProvider = createContext([]);

export default function SizeContext({ children }) {
  const [isOpen, setOpen] = useState(false);

  const [Width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
    console.log(Width)
  };

  return (
    <SProvider.Provider
      value={{ isOpen, setOpen, handleResize, Width, setWidth }}
    >
      {children}
    </SProvider.Provider>
  );
}
