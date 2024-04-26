import { useContext } from 'react';

import { GlobalContext } from './global';


export function useGlobal() {
  const globalContext = useContext(GlobalContext);

  return globalContext;
}
