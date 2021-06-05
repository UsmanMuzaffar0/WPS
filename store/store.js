import React from "react";
import { useLocalObservable } from "mobx-react-lite";
import { action } from "mobx"
export const StoreContext = React.createContext();


export const StoreProvider = (props) => {

 
  const store = useLocalObservable(() => ({

   
   Id:null,
   setId: action((e) => (store.Id = e)),
   

   
    

  }));
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};