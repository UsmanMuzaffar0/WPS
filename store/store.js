import React from "react";
import { useLocalObservable } from "mobx-react-lite";
import { action } from "mobx"
export const StoreContext = React.createContext();


export const StoreProvider = (props) => {

   const store = useLocalObservable(() => ({

   Id:null,
   setId: action((e) => (store.Id = e)),

   email:null,
   setEmail: action((e) => (store.email = e)),

   name:null,
   setName: action((e) => (store.name = e)),

   ph:['2','3','4','5'],
   setPh: action((e) => store.ph.push(e)),

   temp:['25','30','32','35'],
   setTemp: action((e) => store.temp.push(e)),

   tb:['1','2','4','5'],
   setTb: action((e) => store.tb.push(e))


   
  }));
  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};