import React, { createContext, useContext, useEffect, useState } from 'react';
import highsLoader, { Highs } from 'highs';

interface HighsContext {
  highs: Highs | undefined;
}

const HighsContext = createContext<HighsContext | undefined>(undefined);

export const HighsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highs, setHighs] = useState<Highs | undefined>(undefined);

  useEffect(() => {
    const loadHighs = async () => {
      const highs = await highsLoader({
        locateFile: (file: string) => "https://lovasoa.github.io/highs-js/" + file
      })
      setHighs(highs);
    }
    loadHighs();
  }, []);

  return (
    <HighsContext.Provider value={{ highs }}>
      {children}
    </HighsContext.Provider>
  );
};

export const useHighs = (): Highs | undefined => {
  const highs = useContext(HighsContext);
  if (!highs) {
    throw new Error("HighsContext not found");
  }
  return highs.highs;
}
