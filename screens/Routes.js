import React, { useContext, useEffect, useState } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './StackNavigation/StackNavigation';
import auth from '@react-native-firebase/auth';
import DrawerNavigation from './DrawerNavigation//DrawerNavigation';
import { StoreContext } from '../store/store';
import { Observer } from 'mobx-react-lite';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function Routes() {

    const store = useContext(StoreContext)

  // const [initializing ,setInitializing ]= useState(true)

  // const onAuthStateChanged = (user) => {
  //   store.setId(user)
  //   console.log("User Routes",store.Id)
  //   if(initializing) setInitializing(false)
  // }

  useEffect(()=>{
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber;
    AsyncStorage.getItem('@user_id').then(
      id=>{
        console.log('Get User Id From Local Storage on App Launch:'+id)
        store.setId(id)
        console.log("storeId:", store.Id)
      }
    ).catch(e=>{
      console.log('Error :' +e)
    })
  },[]);

  // if(initializing) return null;
  
  return (
    <Observer>
      {
        ()=>
            <NavigationContainer>
            {store.Id ?<DrawerNavigation/>:<StackNavigation/>}
            </NavigationContainer>
        }
        </Observer>
  );
}
