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
  const adminId = 'TjNItOdbITQ9RLb6gSLiwMxdR7a2'


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
         store.Id && store.Id.uid == adminId ? <AdminDrawerNav/>:<UserDrawerNav/> 
        }
        </>
      
      }
  </Observer>
  
  );
}
export default DrawerNavigation;