import React from 'react';
import Routes from './screens/Routes';
import {StoreProvider} from './store/store'


export default function App() {

  
  return (
    <StoreProvider>
         <Routes/>
    </StoreProvider>
 
  );
}
