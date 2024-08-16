import { createContext, useContext, useEffect, useState } from "react";

const storeContext = createContext();
export function Provider({ children, store }) {
  const [state, setState] = useState(store.getState());
  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  },[])
    
  return (
    <storeContext.Provider value={{ state, dispatch: store.dispatch }}>
      {children}
    </storeContext.Provider>
  );
}
export const useDispatch = () => useContext(storeContext).dispatch;

export const useSelector = (selector) =>selector(useContext(storeContext).state);
  
