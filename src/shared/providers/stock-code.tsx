import {
  createContext,
  useContext,
  type PropsWithChildren,
  useState,
} from 'react';

type StockCodeContextType = {
  stockCode: string;
  setStockCode: (code: string) => void;
};

const StockCodeContext = createContext<StockCodeContextType | undefined>(
  undefined
);

export function StockCodeProvider({ children }: PropsWithChildren) {
  const [stockCode, setStockCode] = useState('035720');

  return (
    <StockCodeContext.Provider value={{ stockCode, setStockCode }}>
      {children}
    </StockCodeContext.Provider>
  );
}

export function useStockCode() {
  const context = useContext(StockCodeContext);
  if (!context) return { stockCode: '035720', setStockCode: () => {} };
  return context;
}
