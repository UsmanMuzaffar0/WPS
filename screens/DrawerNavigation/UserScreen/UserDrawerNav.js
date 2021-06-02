import React, {useEffect, useState,useContext}  from 'react';
import { Button, View , Text,Image,Alert} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../../DrawerNavigation/UserScreen/Home';
import Notification from '../../DrawerNavigation/UserScreen/Notification'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import colors from '../../../config/colors';
import Complaint from '../../DrawerNavigation/UserScreen/Complaint';
import Suggestion from '../../DrawerNavigation/UserScreen/Suggestion';
import UserSettings from '../../DrawerNavigation/UserScreen/UserSettings';

const Drawer = createDrawerNavigator();

const UserDrawerNav = () => {

  useEffect(() => {

    return () => {

    }
  }, [])


  return (

         <Drawer.Navigator
            drawerStyle={{backgroundColor:colors.grey}}
            drawerContentOptions={{activeTintColor:colors.white,activeBackgroundColor:colors.seagreen}}
      
            initialRouteName="Home">
          
            <Drawer.Screen name="Home"  options={{  drawerIcon: ({focused}) => (<Ionicons name={focused ? 'ios-home-outline' : 'ios-home' } size={20} color={focused ? colors.white: colors.seagreen}  />) ,title:({focused})=><Text style={{color: focused? colors.white: colors.seagreen}}>Dashboard</Text>}} component={Home} />
            <Drawer.Screen name="Notification"  options={{  drawerIcon: ({focused}) => (<Ionicons name={focused ? 'ios-notifications-outline' : 'ios-notifications-sharp' } size={20} color= {focused ? colors.white: colors.seagreen} />) ,title:({focused})=><Text style={{color: focused? colors.white: colors.seagreen}}>Notification</Text>}} component={Notification} />
            <Drawer.Screen name="Complaint"  options={{  drawerIcon: ({focused}) => (<AntDesign name={focused ? 'tagso' : 'tags' } size={20} color= {focused ? colors.white: colors.seagreen} />) ,title:({focused})=><Text style={{color: focused? colors.white: colors.seagreen}}>Complaints</Text>}} component={Complaint} />
            <Drawer.Screen name="Suggestion"  options={{  drawerIcon: ({focused}) => (<AntDesign name={focused ? 'pushpino':'pushpin'} size={20} color= {focused ? colors.white: colors.seagreen} />) ,title:({focused})=><Text style={{color: focused? colors.white: colors.seagreen}}>Suggestion</Text>}} component={Suggestion} />
            <Drawer.Screen name="UserSettings"  options={{  drawerIcon: ({focused}) => (<Ionicons name={focused ? "settings-outline":"settings-sharp"} size={20} color= {focused ? colors.white: colors.seagreen} />) ,title:({focused})=><Text style={{color: focused? colors.white: colors.seagreen}}>Settings</Text>}} component={UserSettings} />
        
          </Drawer.Navigator>
    
    
  );
}
export default UserDrawerNav;