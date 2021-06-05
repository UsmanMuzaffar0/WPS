import React, {useEffect, useState,useContext}  from 'react';
import { Button, View , Text,Image,Alert} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Observer } from 'mobx-react-lite';
import { StoreContext } from '../../store/store';
import UserDrawerNav from './UserScreen/UserDrawerNav';
import AdminDrawerNav from './AdminScreen/AdminDrawerNav';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {

  const store = useContext(StoreContext)
  const adminId = 'd623ee33-97c3-4594-bc6f-665b20ed6ab0'


  useEffect(() => {

    return () => {

    }
  }, [])


  return (

    <Observer>
      {
        ()=>
        <>
        {
         store.Id && store.Id == adminId ? <AdminDrawerNav/>:<UserDrawerNav/> 
        }
        </>
      
      }
  </Observer>
  
  );
}
export default DrawerNavigation;