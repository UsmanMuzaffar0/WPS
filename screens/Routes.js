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

const setName = ()=> {
  AsyncStorage.getItem('@name').then(
    name=>{
      console.log('Get User name From Local Storage on App Launch:'+name)
      store.setName(name)
      console.log("storeName:", store.name)
    }
  ).catch(e=>{
    console.log('Error :' +e)
  })
}

const setEmail = ()=> {
  AsyncStorage.getItem('@email').then(
    email=>{
      console.log('Get User Email From Local Storage on App Launch:'+email)
      store.setEmail(email)
      console.log("storeEmail:", store.email)
    }
  ).catch(e=>{
    console.log('Error :' +e)
  })
}

  useEffect(()=>{
    // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber;

    setName()
    setEmail()
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
