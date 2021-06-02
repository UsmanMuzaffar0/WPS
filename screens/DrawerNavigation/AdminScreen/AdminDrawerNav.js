import React, {useEffect, useState,useContext}  from 'react';
import { Button, View , Text,Image,Alert} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import colors from '../../../config/colors';
import SetSensorLevel from '../AdminScreen/SetSensorLevel';
import ComplaintHandle from './ComplaintHandle';
import SuggestionHandle from './SuggestionHandle';
import MaintainRecords from './MaintainRecords';
import DelUser from './DelUser';

const Drawer = createDrawerNavigator();

const AdminDrawerNav = () => {

  useEffect(() => {

    return () => {

    }
  }, [])


  return (

        <Drawer.Navigator
          drawerStyle={{backgroundColor:colors.grey}}
          drawerContentOptions={{activeTintColor:colors.white,activeBackgroundColor:colors.seagreen}}>

          <Drawer.Screen name="SetSensorsLevel"  options={{  drawerIcon: ({focused}) => (<Ionicons name={focused ? "hardware-chip-outline":"hardware-chip-sharp"} size={20} color= {focused ? colors.white: colors.seagreen} />) ,title:({focused})=><Text style={{color: focused? colors.white: colors.seagreen}}>Set Sensors Level</Text>}} component={SetSensorLevel} />
          <Drawer.Screen name="ComplaintHandle"  options={{  drawerIcon: ({focused}) => (<MaterialCommunityIcons name={focused ? "chat-alert-outline":"chat-alert-outline"} size={20} color= {focused ? colors.white: colors.seagreen} />) ,title:({focused})=><Text style={{color: focused? colors.white: colors.seagreen}}>Complaints Handle</Text>}} component={ComplaintHandle} />
          <Drawer.Screen name="SuggestionHandle"  options={{  drawerIcon: ({focused}) => (<Ionicons name={focused ? "list-circle-outline":"list-circle-sharp"} size={20} color= {focused ? colors.white: colors.seagreen} />) ,title:({focused})=><Text style={{color: focused? colors.white: colors.seagreen}}>Suggestion Handle</Text>}} component={SuggestionHandle} />
          <Drawer.Screen name="MaintainRecords"  options={{  drawerIcon: ({focused}) => (<Entypo name={focused ? "text-document":"text-document-inverted"} size={20} color= {focused ? colors.white: colors.seagreen} />) ,title:({focused})=><Text style={{color: focused? colors.white: colors.seagreen}}>Maintain Records</Text>}} component={MaintainRecords} />
          <Drawer.Screen name="DelUser"  options={{  drawerIcon: ({focused}) => (<AntDesign name={focused ? "minuscircleo":"minuscircle"} size={20} color= {focused ? colors.white: colors.seagreen} />) ,title:({focused})=><Text style={{color: focused? colors.white: colors.seagreen}}>Delete User</Text>}} component={DelUser} />
        </Drawer.Navigator>
    
  );
}
export default AdminDrawerNav;