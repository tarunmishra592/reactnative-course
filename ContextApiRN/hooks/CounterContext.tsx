import { createContext, useContext, useMemo, useState } from "react";


type CounterContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const CounterContext = createContext<CounterContextType | undefined>(undefined);

export const CounterProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  const value = useMemo(() => ({ count, setCount }), [count])

  return (
    <CounterContext.Provider value={value}>{children}</CounterContext.Provider>
  );
};

export const useCounter = () => {
    const context = useContext(CounterContext)

    if(!context){
        throw new Error("useCounter must be used within a CounterProvider")
    }

    return context
}


