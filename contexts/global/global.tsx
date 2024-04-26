import React, { createContext, useMemo, useState } from 'react';

import { IGlobalContext, IGlobalProviderProps } from './types';


export const GlobalContext = createContext({} as IGlobalContext);

export function GlobalProvider({ children }: IGlobalProviderProps) {

  const [activeTab, setActiveTab] = useState<string>('Apex Unit');



  const contextData = useMemo(
    () => ({
      activeTab,
      setActiveTab,
    }),
    [activeTab],
  );

  return (
    <GlobalContext.Provider
      value={contextData}
    >
      {children}
    </GlobalContext.Provider>
  );
}
