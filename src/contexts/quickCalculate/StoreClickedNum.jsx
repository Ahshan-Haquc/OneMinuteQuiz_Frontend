// src/context/quickCalculate/StoreClickedNum.jsx
import { createContext, useContext, useState } from "react";

export const StoreClickedNumContext = createContext();

export const StoreClickedNumProvider = ({ children }) => {
  const [quickNum, setQuickNum] = useState(0);

  return (
    <StoreClickedNumContext.Provider value={{ quickNum, setQuickNum }}>
      {children}
    </StoreClickedNumContext.Provider>
  );
};

export const useStoreClickedNum = () => {
  return useContext(StoreClickedNumContext);
};
