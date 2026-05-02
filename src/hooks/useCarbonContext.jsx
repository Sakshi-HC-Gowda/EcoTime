import { createContext, useContext } from "react";
import { useCarbonData } from "./useCarbonData";

const CarbonContext = createContext(null);

export function CarbonProvider({ children }) {
  const carbon = useCarbonData();
  return <CarbonContext.Provider value={carbon}>{children}</CarbonContext.Provider>;
}

export function useCarbon() {
  const context = useContext(CarbonContext);

  if (!context) {
    throw new Error("useCarbon must be used within CarbonProvider");
  }

  return context;
}
