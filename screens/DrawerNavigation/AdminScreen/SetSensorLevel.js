import React ,{useEffect,useState,useContext} from 'react';
import {Text, View} from 'react-native'
import { Header,Button, Left, Right, Body, Icon,Toast, Card} from 'native-base';
import colors from '../../../config/colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import auth from '@react-native-firebase/auth';
import { Observer } from 'mobx-react-lite';
import { StoreContext } from '../../../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage'


function SetSensorsLevel(props) {

  const store = useContext(StoreContext)


  const logout = async () =>{
    AsyncStorage.removeItem('@user_id').then(
      res=>{
  
        console.log('User Id Remove Successfully', res)
        store.setId(null)
        // Toast.show({
        //   text: 'Logout Succesfully',
        //   type: "success",
        //   style:{opacity:0.9},
        //   textStyle:{color:colors.white,textAlign:'center'}
        // })
  
      }
    ).catch(
      e=>{
        console.log('Error While Removig Id from Local Storage'+e)
      }
    )
  
  } 
  console.log("user",store.Id)

  useEffect(()=>{
    
  },[]);

    return (
      <Observer>
      {
        ()=>
      <>
        <Header style={{backgroundColor: colors.seagreen}}>
          <Left style={{flex:1}}>
            <Button transparent onPress={()=> props.navigation.openDrawer() }> 
              <Icon name='menu' style={{color: colors.white}} />
            </Button>

          </Left>
          <Body style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize:18, color: colors.white}}>Admin</Text>
          </Body>
          <Right style={{flex:1,alignItems:"center",flexDirection:"row"}}>
            
                <Ionicons size={22} onPress={()=>props.navigation.navigate("Notification")} name='notifications-outline' style={{color: colors.white}} />
                <AntDesign onPress={()=>logout()} name='poweroff' size={20} style={{color: colors.white,paddingLeft:15}} />
          
          </Right>
        </Header>
        <View>
          <Text>{store.Id.uid}</Text>
          <Text>Sensors Screen</Text>
        </View>

        </>
}
</Observer>
    );
}

export default SetSensorsLevel;